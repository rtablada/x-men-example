var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var BookSchema = Schema({
  title: {type: String, required: true},
  year: {type: Number, required: true},
  data: {
    isbn: {type: String, required: true},
  },
  author: {type: Schema.Types.ObjectId, ref: 'Person'},
});

module.exports = Mongoose.model('Book', BookSchema);
