// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app, passport) {

// post route to signup a user
// app.post('/api/signup', function(req, res){
//   console.log('success');
//   res.json({message: 'YES IT WORKED'});
// });
app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect: '/home?success',
        failureRedirect: '/home?fail'
    }
));

// route to log a user out
app.get('/api/logout', function(req, res){
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

app.post('/api/event', function(req, res) {

  console.log("baby_steps",request.body);
  db.event.create({
    title: request.body.title,
    description: request.body.description,
    story: request.body.story,
    date: request.body.date,
    image: 

  }).then(function(results){
    res.end();
  });
});

// DELETE route for deleting event

app.delete('/api/event', function(req, res) {
  db.event.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbevent){
    res.json(dbevent);
  });


});

// PUT route for updating event/////

app.put('/api/event', function(req, res) {
  db.event.update({
    title: request.body.title,
    description: request.body.description,
    story: request.body.story,
    date: request.body.date,
    image:


  }, {
    
      where: {
        id: req.body.id
      }
  
    }).then(function(dbevent){
      res.json(dbevent);
    });
    
  });











// STUFF BELOW HERE IS ONLY FOR AN EXAMPLE OF HOW TO DO STUFF


  // Get rotue for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // middleware for logging in
  function isLoggedIn(req, res, next) {
   if (req.isAuthenticated())
     return next();    
   res.redirect('/signin');
 }
};


