var express = require('express');
var router = express.Router();

var books = require('./resources/books');
var people = require('./resources/people');

router.use('/books', books);
router.use('/people', people);

module.exports = router;
