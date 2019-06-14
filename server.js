//@ Imported libraries
const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//@ User defined
const mongoose = require('./db/mongoose');
const course = require('./routes/api/course');
const branch = require('./routes/api/branch');
const subject = require('./routes/api/subject');
const semester = require('./routes/api/semester');
const app = express();
const PORT = process.env.PORT || 5000;

//@ Middlewares
app.use(bodyParser.json());

//@ Routes
app.use('/api/course', course);
app.use('/api/branch', branch);
app.use('/api/subject', subject);
app.use('/api/semester', semester);

app.listen(PORT, err => {
  if (err) {
    console.log('Unable to start server');
  } else {
    console.log(`Server is started on port ${PORT}`);
  }
});
