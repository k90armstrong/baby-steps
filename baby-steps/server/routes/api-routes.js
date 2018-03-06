// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var Child = require("../models/child.js");
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage }).array('userPhoto',8);


module.exports = function(app, passport) {

  // User APIs_________________________________________________________
  app.get('/api/user/status', function(req, res) {
    console.log(req.user);
    res.json({authenticated: req.isAuthenticated()});
  });

  app.get('/api/user', function(req, res) {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({error: 'Failed to login'});
    }
  });

  app.post('/api/user/update', function(req, res) {
    if (req.user) {
      db.User.update({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      },
      {
        where: {
          id: req.user.id
        }
      })
      .then(function(user) {
        res.json(user);
      });
    }
  });

  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/api/user',
    failureRedirect: '/api/user'
  }
  ));

  // route to log a user out
  app.get('/api/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.json({message: 'success'});
    });
  });

  app.get('/api/username', function(req, res) {
    console.log(req.user);
    if (req.user) {
      res.json({user: req.user});
    } else {
      res.json({message: 'No user logged in'});
    }
  });
  // End User APIs_________________________________________________________

  // Invite APIS___________________________________________________________
  app.post('/api/invite/create', function(req, res) {
    if (req.user) {
      db.User.findOne({
        where: {
          email: req.body.inviteEmail
        }
      })
      .then(invitee => {
        console.log(invitee);
        if (invitee) {
          let invite = {
            message: req.body.message,
            from: req.user.firstname + ' ' + req.user.lastname,
            UserId: invitee.id,
            FamilyId: req.body.familyId
          }
          return db.Invite.create(invite);
        }
        })
        .then(()=>res.json({message: 'success'}))
        .catch(error => res.json({message: 'there was an error'}));
    } else {
      res.json({message: 'there is no user'});
    }
  });

  app.post('/api/invite/respond', function(req, res) {
    let message;
    if (req.user) {
      db.Invite.findById(req.body.inviteId, {
        include: [db.Family, db.User]
      })
      .then(invite => {
        if (req.body.accept) {
          // add family to the user
          message = 'Family added';
          invite.Family.addUser(invite.User, {through: {role: 'manager'}});
        } else {
          message = 'Invite removed'
        }
        // delete the invite
        return invite.destroy();
      })
      .then(()=>{res.json({message: 'success'})})
      .catch(invite => res.json({message: 'failure to add'}));
    } else {
      res.json({message: 'there is no user'});
    }
  });

  app.get('/api/invites', function(req, res) {
    db.Invite.findAll({
      where: {
        UserId: req.user.id
      },
      include: [db.Family]
    })
    .then(results=>res.json(results));
  });

  app.post('/api/invite/delete', function(req,res) {
    if (req.user) {
      db.Invite.destroy({
        where: {
          id: req.body.inviteId
        }
      })
      .then(family => {
        console.log(family);
        res.json({message: 'success'});
      });
    }
  });
  // END INVITE APIS_______________________________________________________

  // Family APIs___________________________________________________________
  app.get('/api/families', function(req, res) {
    var query = {};
    if (req.user) {
      query.UserId = req.user.id;
    }
    db.Family.findAll({
      include: [{
        model: db.User,
        required: true,
        attributes: ['firstName', 'lastName', 'id'],
        through: {
          where: {UserId: req.user.id}
        }
      }],
      
    }).then(function(family) {
      res.json(family);
    });
  });

  app.post('/api/family/create', function(req,res) {
    if (req.user) {
      db.Family.create({
        name: req.body.name
      })
      .then(family => {
        return family.addUser(req.user.id, {through: {role: 'manager'}})
      })
      .then(()=>res.json({message: 'success'}))
      .catch(()=>res.json({message: 'error'}))
    }
  });

  app.post('/api/family/delete', function(req,res) {
    if (req.user) {
      db.Family.destroy({
        where: {
          id: req.body.familyId
        }
      })
      .then(family => {
        console.log(family);
        res.json({message: 'success'});
      });
    }
  });
  // END FAMILY APIS_______________________________________________________

  // Events APIs*************************************
  app.get("/api/events", function(req, res) {
    var query = {};
    if (req.query.child_id) {
      query.ChildId = req.query.child_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Event.findAll({
      where:query, 
      include: [db.Child]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  app.get("/api/events/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Child]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  app.post('/api/events', function (req, res) {
    upload(req,res,function(err) {
      console.log(req.body);
      console.log(req.files);
    // var childId = req.body.childId;
     // var userId = req.user.id;
    var images=[];
      for (i = 0; i < req.files.length; i++) {
        images.push({url:req.files[i].filename})
  //       console.log("filename =" + req.files[i].filename);
  // img_name +=  req.files[i].filename + ";";
}
console.log("Image name string = "+img_name);
      if(err) {
         console.log(err);
          return res.end("Error uploading file.");
      }   
// var sql = "INSERT INTO `children`(`image`) VALUES ('" + img_loc_on_server + "')";


    // console.log("users_image", req.body);
    var event = {
      title: req.body.title,
      description: req.body.description,
      story: req.body.story,
      date: req.body.date,
      
      ChildId: req.body.childId
      // ChildId: uId
    }
    db.Event.create(event).then(function (dbEvent) {
      for(i=0;i<images.length;i++){
        images[i].EventId = dbEvent.id
      }
      return db.Image.bulkCreate(images)

      
    }).then(function(res){
      res.json({message:'success'

      });
    }).catch(error=>res.json({message:'there was a error'}));
  });

});
    
    

  // DELETE route for deleting event

  app.delete('/api/events/:id', function (req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvent) {
      res.json(dbEvent);
    });


  });

  // PUT route for updating event/////

  app.put('/api/events', function (req, res) {
    let sampleFile = req.files.sampleFile;
  var img_name=sampleFile.name;
  var img_loc_on_server = 'public/images/upload_images/'+img_name;
    // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(img_loc_on_server, function(err) {
          if (err)
              return console.log(err);
          console.log('File uploaded!');
      });


    db.Event.update({
     title: req.body.title,
       description: req.body.description,
       story: req.body.story,
       date: req.body.date,
       imageurl: 'images/upload_images/'+ img_name
     },{
      where:{
        id: req.body.id
      }

      
  }).then(function (dbEvent) {
    res.json(dbEvent);
  });

});


//*************** api routes for children**********************************
  app.get("/api/children", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Child.findAll({
      where: {
        userId: req.user.id
      },
      include: [db.Event]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

app.get("/api/childs/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Child.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Event]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

app.post("/api/photo", function(req, res) {
  upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
      
        var img_name ="";
        var fname = "ftemp";
        var lname = "ltemp";
        var weight = "20";
        var height = "40";
        var hospitalborn = "temp hospital";
        var gender = "M";
        var birthdate = null;

        for (i = 0; i < req.files.length; i++) {
          console.log("filename =" + req.files[i].filename);
    img_name +=  req.files[i].filename + ";";
}
console.log("Image name string = "+img_name);
        if(err) {
           console.log(err);
            return res.end("Error uploading file.");
        }   
       db.Child.create({
      image:img_name,
      firstname:fname,
      lastname:lname,
      weight:weight,
      height:height,
      hospitalborn:hospitalborn,
      gender:gender,
      birthdate:null
    }).then(function(dbChild) {
      res.json(dbChild);
    });
    });
});
  // console.log(req.body);
  // console.log(req.body.firstname);
  // console.log(req.files.sampleFile);
  
    // Use the mv() method to place the file somewhere on your server
      
// var sql = "INSERT INTO `children`(`image`) VALUES ('" + img_loc_on_server + "')";

//                 var query = db.query(sql, function(err, result) {
//                     res.json(result);
//                 });

    // db.Child.create({
    //   image:'images/upload_images/'+img_name,
    //   firstname:req.body.firstname,
    //   lastname:req.body.lastname,
    //   weight:req.body.weight,
    //   height:req.body.height,
    //   hospitalborn:req.body.hospitalborn,
    //   gender:req.body.gender,
    //   birthdate:req.body.birthdate,
    //   userId: userId
    // }).then(function(dbChild) {
    //   res.json(dbChild);
    // });
    
   // });
 // });
 app.post('/api/childs',function(req,res){
    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        var img_name=sampleFile.name;
        var userId = req.user.id;
        for (i = 0; i < req.files.length; i++) {
          console.log("filename =" + req.files[i].filename);
    img_name +=  req.files[i].filename + ";";
}
console.log("Image name string = "+img_name);
        if(err) {
           console.log(err);
            return res.end("Error uploading file.");
        }   
       db.Child.create({
      image:img_name,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      weight:req.body.weight,
      height:req.body.height,
      hospitalborn:req.body.hospitalborn,
      gender:req.body.gender,
      birthdate:req.body.birthdate,
      userId: userId
    }).then(function(dbChild) {
      res.json(dbChild);
    });
    });
  });

  

  app.delete("/api/childs/:id ", function(req, res) {
    db.Child.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  // PUT/UPDATE //////////////////

  app.put("/api/childs", function(req, res) {
    let sampleFile = req.files.sampleFile;
  var img_name=sampleFile.name;
  var img_loc_on_server = 'public/images/upload_images/'+img_name;
    // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(img_loc_on_server, function(err) {
          if (err)
              return console.log(err);
          console.log('File uploaded!');
      });



    db.Child.update({
      image:img_loc_on_server,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      weight:req.body.weight,
      height:req.body.height,
      hospitalborn:req.body.hospitalborn,
      gender:req.body.gender,
      birthdate:req.body.birthdate
    }, {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbChild) {
      res.json(dbTodo);
    });

  });


   // middleware for logging in
  function isLoggedIn(req, res, next){
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }

};