(function() {
 
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('meanReadingList', ['readingItems']);
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/api/readingItems', function(req, res) {
    db.readingItems.find(function(err, data) {
      res.json(data);
    });
  });
 
  router.post('/api/readingItems', function(req, res) {
    db.readingItems.insert(req.body, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.put('/api/readingItems', function(req, res) {
 
    db.readingItems.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }, {}, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.delete('/api/readingItems/:_id', function(req, res) {
    db.readingItems.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });
 
  });
 
  module.exports = router;
 
}());