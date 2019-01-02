// to ensure authentication to the page if there's a manupilation in the routes
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in.');
        res.redirect('/users/login');

    }
}