var Mongoose = require('mongoose');

var PersonSchema = Mongoose.Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  email: {type: String, required: true},
});

module.exports = Mongoose.model('Person', PersonSchema);
