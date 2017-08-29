var express = require('express');
var router = express.Router();
var generator = require('../public/javascripts/generator');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Midi Generator' });
});

module.exports = router;
