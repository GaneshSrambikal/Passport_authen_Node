const express = require('express');
const {ensureAuthenicated} = require('../config/auth');
const router = express.Router();

//home page
router.get('/', (req, res) => res.render('welcome'));

//dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard',{
        name:req.user.name
    })
});

module.exports = router;