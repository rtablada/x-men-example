var session = require('express-session');
var flash = require('express-flash');
var flashError = require('../middleware/flash-error');
var redirectHelpers = require('../middleware/redirect-helpers');
var oldInput = require('../middleware/old-input');
var RedisStore = require('connect-redis')(session);

module.exports = function (app) {
    app.use(session({
        store: new RedisStore(),
        secret: 'asdfghjklqwertyuio',
        resave: false,
        saveUninitialized: true
    }));
    app.use(flash());
    app.use(flashError);
    app.use(redirectHelpers);
    app.use(oldInput);
};
