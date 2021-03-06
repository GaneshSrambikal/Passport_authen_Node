const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


//passport config
require('./config/passport')(passport);

//db config
const db = require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParser Middleware
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

//Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

//connect flsh
app.use(flash());

//global vars
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users.js'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server start at port ${PORT}`));