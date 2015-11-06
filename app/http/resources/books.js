var express = require('express');
var router = express.Router();
var Mongoose = require('mongoose');
var _ = require('lodash');
var url = require('url');

router.get('/', function(req, res) {
  return req.store.recordCollection('Book', {include: ['author'], queryBy: ['year'], orderBy: 'year'});
});

router.post('/', function(req, res) {
  // req.store.createRecord('Book');

  var data = {
    title: req.body.title,
    year: req.body.year,
    data: {
      isbn: req.body.isbn,
    },
  };
  var Book = Mongoose.model('Book');

  var book = new Book(data);
  book.save((err) => {
    if (err) {
      return res.send({err});
    }

    res.send(book.toObject());
  });
});

module.exports = router;
