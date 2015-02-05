var mailer = require('express-mailer'),
    config = require('config');

module.exports = function (app) {
    mailer.extend(app, config.get('mail'));
};
