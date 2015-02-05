var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
require('./bootstrap/middleware')(app);
require('./bootstrap/session')(app);
require('./bootstrap/views')(app);
require('./bootstrap/mail')(app);
require('./bootstrap/mongo');
require('./app/models');
require('./bootstrap/passport')(app);
require('./app/transformers');

var routes = require('./app/http/routes');
app.use('/', routes);

require('./bootstrap/errors')(app);

module.exports = app;
