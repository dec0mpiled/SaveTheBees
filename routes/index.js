var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Save The Bees!' });
});

router.get('/facts', function(req, res, next) {
  res.render('facts', { title: 'Facts About Bees' });
});

router.get('/donate', function(req, res, next) {
  res.render('donate', { title: 'Donation' });
});

module.exports = router;
