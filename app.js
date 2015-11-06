var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
require('./bootstrap/middleware')(app);
require('./bootstrap/session')(app);
require('./bootstrap/views')(app);
require('./bootstrap/mongo');
require('./app/models');
require('./app/transformers');

var xmen = require('./bin/xmen');
var routes = require('./app/http/routes');
app.use(xmen);
app.use('/', routes);

require('./bootstrap/errors')(app);

module.exports = app;
