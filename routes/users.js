const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');

//Login Page
router.get('/login', (req, res) => {
    res.render('login');
    console.log("showing page: login");
});

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
    console.log("showing page: Register");
});

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
        console.log(errors);
    }

    //check password match
    if (password !== password2) {
        errors.push({ msg: 'passwords do not match' });
        console.log(errors);
    }

    //check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 character' });
        console.log(errors);
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        //validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user existed
                    errors.push({ msg: 'Email already exists' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    //hash passowrd
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //set password to hashed
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can login.');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }));
                        //for console only
                    console.log("New User " + name + " created.");
                }
            });

    }
});

//login handle
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,

    })(req, res, next);
});

//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
    //for console only
    console.log("User Loged Out");
    
});


module.exports = router;