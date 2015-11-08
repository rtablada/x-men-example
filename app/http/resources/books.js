var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  return req.store.recordCollection('Book', {
    include: ['author'],
    queryBy: ['year'],
    orderBy: 'year',
  });
});

router.get('/:id', function(req, res) {
  return req.store.recordItemById('Book', req.params.id);
});

router.post('/', function(req, res) {
  return req.store.createRecord('Book', {
    include: ['author'],
    beforeSave: (book, save) => {
      book.author = '563ed344bd48dfad25a9dbd2';
      save();
    },

    afterSave: (book) => {
      var author = book.author;

      author.books.push(book);
      author.save();
    },
  });
});

module.exports = router;
