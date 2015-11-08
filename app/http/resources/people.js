var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  return req.store.recordCollection('Person', {
    include: ['books'],
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
