var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var PersonSchema = Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  email: {type: String, required: true},

  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
});

module.exports = Mongoose.model('Person', PersonSchema);
