module.exports = function (req, res, next) {
    // Check if logged in
    if (req.user) {
        next();
    } else {
        // Not logged in redirect to login
        req.flash('danger', 'You must be logged in.');

        res.redirect('/login');
    }
};
