var express = require('express');
var app = express();

require('./bootstrap/view')(app);
require('./bootstrap/mongo')(app);
require('./bootstrap/server')(app);

require('./http/routes')(app);

require('./bootstrap/errors')(app);

module.exports = app;
