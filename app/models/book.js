var Mongoose = require('mongoose');

var BookSchema = Mongoose.Schema({
  title: {type: String, required: true},
  year: {type: Number, required: true},
  data: {
    isbn: {type: String, required: true},
  },
  author: {type: String, ref: 'Person'},
});

module.exports = Mongoose.model('Book', BookSchema);
