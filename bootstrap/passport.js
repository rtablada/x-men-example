var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function (email, password, done) {
        User.findOne({email: email}).exec()
            .then(function (user) {
                if (user) {
                    user.checkPassword(password, function () {
                        done(null, user);
                    }, function(err) {
                        done(err, null);
                    });
                } else {
                    done(null, null);
                }
            }, function (err) {
                done(err, null);
            });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, done);
    });
};
