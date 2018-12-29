const express = require('express');

const app = express();
//Routes
app.use('/', require('./routes/index'));
app.use('/register', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server start at port ${PORT}`));