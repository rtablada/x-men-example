var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
var createToken = require('./../../services/token-broker');

var config = require('config');

var tokenCreateError = function (req, res) {
    req.flash('danger', 'The user with your email was not found.');

    res.withInput().redirectBack();
};

/* GET login form. */
router.get('/', function (req, res) {
    res.render('password-reset/create');
});

/* POST submit login */
router.post('/', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err || !user) {
            tokenCreateError(req, res);
            return;
        }

        var token = createToken(user);
        var resetUrl = req.protocol + '://' + req.get('host') + '/reset' + token;

        res.send(token);
        return;

        res.mailer.send('emails/reset-password', {
            to: user.email,
            resetUrl: token,
            subject: 'Password Reset'
        }, function (err) {
            if (err) {
                console.log(err);
                res.send('There was an error sending the email');
            } else {
                res.send('email sent');
            }
        });
    });
});

router.all('/logout', function (req, res) {
    req.logOut();
    req.flash('success', 'You have logged out');

    res.redirect('/login');
});

module.exports = router;
