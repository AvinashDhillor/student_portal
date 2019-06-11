const express = require('express');
const Branch = require('../../db/models/Branch');
const Course = require('../../db/models/Course');
const _ = require('lodash');

const app = express.Router();

app.post('/add', (req, res) => {
  const body = _.pick(req.body, ['course_id', 'name', 'intake', 'duration', 'total_semester', 'syllabus_summary']);
  let newBranch = new Branch(body);
  let branchData;
  let id;
  newBranch.save().then(branch => {
    id = branch._id;
    branchData = branch;
    return Course.findById(body.course_id);
  }).then(course => {
    course.branches.push(id)
    return course.save();
  }).then(result => {
    return res.send({
      branchData
    })
  }).catch(e => {
    console.log(e);
  })
})

app.get('/show', (req, res) => {
  let id = req.body.id;
  Branch.find({ course_id: id })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.patch('/update', (req, res) => {
  let branch_id = req.body.id;
  let body = _.pick(req.body, [
    'name',
    'intake',
    'duration',
    'total_semester',
    'semester_summary'
  ]);
  Branch.findByIdAndUpdate(branch_id, body, { new: true })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.delete('/delete', (req, res) => {
  let id = req.body.id;
  let course_id = req.body.course_id;
  Branch.findByIdAndDelete(id)
    .then(data => {
      if (data) {
        Course.findByIdAndUpdate(
          course_id,
          { $pull: { branches: id } },
          { new: true }
        ).then(d => {
          if (d) {
            res.send(data);
          }
        });
      }
    })
    .catch(e => {
      console.log(e);
    });
})

module.exports = app;
