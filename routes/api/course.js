const express = require('express');
const _ = require('lodash')

const Course = require('../../db/models/Course');

const app = express.Router();


app.post('/add', (req, res) => {
  const body = _.pick(req.body, ['category', 'name']);
  console.log(body);

  let course = new Course({
    category: body.category,
    name: body.name
  });

  course
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.patch('/edit', (req, res) => {
  const body = _.pick(req.body, ['_id', 'category', 'name']);
  console.log(body);

  Course.findByIdAndUpdate({ _id: body._id }, body, { new: true })
    .then(data => {
      res.send({
        category: data.category,
        name: data.name
      });
    })
    .catch(e => {
      console.log(e);
    });
});

app.get('/show', (req, res) => {
  Course.find()
    .then(data => {
      return res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.delete('/delete', (req, res) => {
  let _id = req.body.id;
  Course.findByIdAndDelete(_id).then(data => {
    return res.send(data);
  });
});

module.exports = app;
