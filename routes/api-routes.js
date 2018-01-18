// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
<<<<<<< HEAD
module.exports = function (app, passport) {

=======
module.exports = function(app, passport) {
>>>>>>> ac184bd5ccf1fd25bbaae67e7e99da16d098321a
  // post route to signup a user
  // app.post('/api/signup', function(req, res){
  //   console.log('success');
  //   res.json({message: 'YES IT WORKED'});
  // });
<<<<<<< HEAD
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/home?success',
    failureRedirect: '/home?fail'
  }
  ));

  // route to log a user out
  app.get('/api/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });
  // app.get('/api/logout', function(req, res){
  //   req.session.destroy(function(err) {
  //     res.redirect('/');
  //   });
  // });
app.get("/api/events", function(req, res) {

  var query = {};
  if (req.query.child_id) {
      query.AuthorId = req.query.child_id;
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

    // console.log("users_image", req.body);
    db.Event.create(req.body)
      // title: req.body.title,
      // description: req.body.description,
      // story: req.body.story,
      // date: req.body.date
      // image: 

    .then(function (dbEvent) {
      res.json(dbEvent);
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
    db.Event.update(
      req.body,{
        where:{
          id: req.body.id
        }
      // }
      // title: req.body.title,
      // description: req.body.description,
      // story: req.body.story,
      // date: req.body.date
      // image:


    // }, {

    //   where: {
    //     id: req.body.id
    //   }

    }).then(function (dbEvent) {
      res.json(dbEvent);
    });

  });
};


=======
  app.post(
    "/api/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home?success",
      failureRedirect: "/home?fail"
    })
  );

  // app.post("/api/signup", function(req, res) {
  //   console.log("Hi from The POST");
  // });

  // route to log a user out
  app.get("/api/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });
>>>>>>> ac184bd5ccf1fd25bbaae67e7e99da16d098321a

  app.post("/api/event", function(req, res) {});

  app.delete("/api/event", function(req, res) {});

<<<<<<< HEAD
=======
  app.put("/api/event", function(req, res) {});
>>>>>>> ac184bd5ccf1fd25bbaae67e7e99da16d098321a

  // STUFF BELOW HERE IS ONLY FOR AN EXAMPLE OF HOW TO DO STUFF





  // STUFF BELOW HERE IS ONLY FOR AN EXAMPLE OF HOW TO DO STUFF


  // Get rotue for retrieving a single post
//   app.get("/api/posts/:id", function (req, res) {
//     // 2. Add a join here to include the Author who wrote the Post
//     db.Post.findOne({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (dbPost) {
//       console.log(dbPost);
//       res.json(dbPost);
//     });
//   });

//   // POST route for saving a new post
//   app.post("/api/posts", function (req, res) {
//     db.Post.create(req.body).then(function (dbPost) {
//       res.json(dbPost);
//     });
//   });

//   // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function (req, res) {
//     db.Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (dbPost) {
//       res.json(dbPost);
//     });
//   });

//   // PUT route for updating posts
//   app.put("/api/posts", function (req, res) {
//     db.Post.update(req.body, {
//       where: {
//         id: req.body.id
//       }
//     }).then(function (dbPost) {
//       res.json(dbPost);
//     });
//   });

  // middleware for logging in
  function isLoggedIn(req, res, next) {
<<<<<<< HEAD
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }
// }


=======
    if (req.isAuthenticated()) return next();
    res.redirect("/signin");
  }
};
>>>>>>> ac184bd5ccf1fd25bbaae67e7e99da16d098321a
