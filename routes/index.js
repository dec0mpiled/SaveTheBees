var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/user');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  
    /* User.update({}, {$push: {verified:0}}, {multi: true}, function(err) {
        if (err) throw err;
    }); */
  
  res.render('index', { title: 'Save The Bees', user:req.user });
});

router.get('/facts', function(req, res, next) {
  res.render('facts', { title: 'Facts - Save The Bees', user:req.user });
});

router.get('/donate', function(req, res, next) {
  res.render('donate', { title: 'Donate - Save The Bees', user:req.user });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login - Save The Bees', user:req.user });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register - Save The Bees', user:req.user });
});

router.get('/forums', function(req, res, next) {
  if (req.user) {
    res.render('forums', { title: 'Forums - Save The Bees', user:req.user });
  } else {
  res.render('login', { title: 'Login - Save The Bees', user:req.user });
  }
});

router.get('/thanks', ensureAuthenticated, function(req, res, next) {
  res.render('yourein', { title: "You're in! - Save The Bees", user:req.user });
});

router.get('/profile', ensureAuthenticated, function(req, res, next) {
  
  Post.find({author:req.user.username}, null, { sort: '-created' }, function(err, foundPosts) {
    
    if (err) return next (err);
    
    
      
  res.render('profile', { title: "My Profile - Save The Bees", user:req.user, posts:foundPosts});
});
});

router.get('/createpost', function(req, res, next) {
  res.render('createpost', { title: 'Create - Save The Bees', user:req.user });
});

router.get('/edit', ensureAuthenticated, function(req, res, next) {
  res.render('editprofile', { title: "Edit Profile - Save The Bees", user:req.user });
});

router.post('/makepost', ensureAuthenticated, function(req, res, next) {
  
  var newPost = new Post({
    
    author: req.user.username,
    name: req.user.name,
    photo: req.user.avi,
    content: req.body.content,
    created: new Date(),
    
  });
  
  newPost.save()
  res.redirect("/profile")
  
});

router.get('/deleteme/:id', ensureAuthenticated, function(req, res, next) {
   
   Post.findOneAndRemove({_id:req.params.id}, function(err, me) {
       
       if (err) return next (err);
       
       res.redirect('/profile');
        
       
   });
    
});

router.post('/updateprofile', ensureAuthenticated, function(req, res, next) {
  
  User.findOne({_id:req.user.id}, function(err, me) {
    
    if (err) return next (err);
    
    me.name = req.body.namebox;
    me.username = req.body.usernamebox;
    me.avi = req.body.avibox;
    me.bio = req.body.biobox;
    me.color = req.body.colorbox;
    
    me.save();
    
  });
  
  res.redirect("/profile");
  
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    return res.redirect('/')
}


module.exports = router;
