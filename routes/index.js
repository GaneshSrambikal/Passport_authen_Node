const express = require('express');

const router = express.Router();

//Login Page
router.get('/', (req, res) => res.send('Login'));

//Register Page
router.get('/register', (req, res) => res.send('Register'));

module.exports = router;