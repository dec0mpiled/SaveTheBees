var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Post = require('../models/post');
var router = express.Router();

router.post('/registernow', function(req, res, next) {
  var username=req.body.username.replace(/[^\x00-\x7F]/g, "");
   if (username=="" || username==" " || username=="  " || username=="   "){
    return res.render("register", {
        info: "Username cannot be blank!",
        active: 'register'
      });
    }
    
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
    
      
    } else {
      
      return res.render("register", {
        info: "Invalid Email address!",
        active: 'register'
      }); 
      
    }

  User.register(new User({
    username: username,
    name: req.body.fname + " " + req.body.lname,
    email: req.body.email,
    avi: "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png",
    verified: false,
    bio: "",
    color: "737373",
  }), req.body.password, function(err, account) {
    if (err) {
      console.log("RAG");
      return res.render("register", {
        info: "Someone got that username before you! :(",
        active: 'register'
      });
    } else {
      
      res.redirect('/thanks');
      
    }
    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }

      });
    });
  });
});

router.post('/loginnow', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

        if (err) return next(err);
    if (req.body.username == "Kailee" && req.body.password == "RAH") { return res.render("login", { info: "Kailee is the most RAH baby ever!", active: 'login', title: 'Login - Save The Bees'}); }
    
    if (!user) { return res.render("login", { info: "That username and password do not match our records. Try again", active: 'login', title: 'Login - Save The Bees'}); }
  
    
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log(user)
      var hour = 3600000;
      req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
      return res.redirect('/');
    });

  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});


module.exports = router;