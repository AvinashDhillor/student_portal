const express = require('express');
const Course = require('../../db/models/Course');

const app = express.Router();

// app.get('/', (req, res) => {
//     res.send({ message: 'YAY! this is working' });
// });

// app.post('/create', (req, res) => {
//     let course = new Course(req.body);
//     course.save().then(data => {
//         res.send(data);
//     });
// });

module.exports = app;
