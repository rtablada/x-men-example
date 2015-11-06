var express = require('express');
var router = express.Router();

var books = require('./resources/books');

router.use('/books', books);

module.exports = router;
