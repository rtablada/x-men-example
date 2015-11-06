var Mystique = require('mystique');

var BookTransformer = Mystique.Transformer.extend({
  resourceName: 'book',
  mapOut: function(book) {
    return {
      title: book.title,
      year: book.year,
      isbn: book.data.isbn,
    };
  },

  mapIn(req) {
    return {
      title: req.body.title,
      year: req.body.year,
      data: {
        isbn: req.body.isbn,
      },
    };
  },
});

Mystique.registerTransformer('Book', BookTransformer);
