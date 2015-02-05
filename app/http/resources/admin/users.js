var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var baseUrl = '/admin/users',
    urlHelper = require('./../../helpers/url')(baseUrl);

var prepareData = function (title, data) {
    data.title = title;
    data.urlHelper = urlHelper;

    return data;
};

var invalidResponse = function (req, res) {
    return function (err) {
        req.flash('danger', 'No news article exists with an id "' + req.params.id + '"');
        res.redirect(urlHelper.index());
    };
};

/* GET get all news articles in a table. */
router.get('/', function (req, res) {
    User.find().exec()
        .then(function (users) {
            var data = prepareData('Users', {
                users: users
            });

            res.render('users/index', data);
        });
});

/* GET form to create new news article. */
router.get('/new', function (req, res) {
    var data = prepareData('Users - New', {
        user: new User()
    });

    res.render('users/create', data);
});

/* POST create new news article from form data. */
router.post('/', function (req, res) {
    User.create(req.body)
        .then(function (user) {
            req.flash('success', '"' + user.email + '" has been created.');
            res.redirect(urlHelper.index());
        }, function (err) {
            req.flash('errors', err.errors);
            req.flash('danger', 'There was an error saving this news article');

            res.withInput().redirectBack();
        });
});

/* GET get a detailed view of a news article. */
router.get('/:id', function (req, res) {
    User.findById(req.params.id).exec()
        .then(function (user) {
            var data = prepareData('Users - ' + user.email, {
                user: user
            });

            res.render('users/show', data);
        }, invalidResponse(req, res));
});

/* GET edit form for a news article. */
router.get('/:id/edit', function (req, res) {
    User.findById(req.params.id).exec()
        .then(function (user) {
            var data = prepareData('Users - Edit - ' + user.email, {
                user: user
            });

            res.render('users/edit', data);
        }, invalidResponse(req, res));
});

/* PUT save updates to a news article. */
router.put('/:id', function (req, res) {
    User.findById(req.params.id).exec()
        .then(function (user) {
            user.set(req.body);
            user.save(function (err, user) {
                if (err) {
                    req.flash('errors', err.errors);
                    req.flash('danger', 'There was an error saving this news article');

                    res.withInput().redirectBack();
                    return;
                }

                req.flash('success', '"' + user.email + '" has been updated.');
                res.redirect(urlHelper.index());
            });
        }, invalidResponse(req, res));
});

/* DELETE remove a news article. */
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id).exec()
        .then(function (user) {
            req.flash('success', '"' + user.email + '" has been deleted.');
            res.redirect(urlHelper.index());
        }, invalidResponse(req, res));
});

module.exports = router;
