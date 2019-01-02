const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

//home page
router.get('/', (req, res) => {
    res.render('welcome');
    console.log("showing page: Welcome");
});

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name

    });
    //for console only
    const name = req.user.name;
    console.log("showing page: Dashboard");
    console.log("User loged In: " + name);

});

module.exports = router;