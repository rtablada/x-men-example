var express = require('express');
var router = express.Router();
var Mongoose = require('mongoose');
var _ = require('lodash');
var url = require('url');
var Mystique = require('mystique');

router.get('/', function(req, res) {
  return req.store.recordCollection('Person', {
    include: ['author'],
    queryBy: ['year'],
    orderBy: 'year',
  });
});

router.get('/:id', function(req, res) {
  return req.store.recordItemById('Person', req.params.id);
});

router.post('/', function(req, res) {
  return req.store.createRecord('Person');
});

module.exports = router;
