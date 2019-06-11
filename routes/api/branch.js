const express = require('express');
const Branch = require('../../db/models/Branch');

const app = express.Router();

app.get('/', (req, res) => {
  res.send({ message: 'YAY! this is working' });
});

app.post('/create', (req, res) => {
  let branch = new Branch(req.body);
  branch.save().then(data => {
    res.send(data);
  });
});

module.exports = app;
