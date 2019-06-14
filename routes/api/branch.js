const express = require('express');
const Branch = require('../../db/models/Branch');
const Course = require('../../db/models/Course');
const _ = require('lodash');


const { multerUploads, dataUri } = require('../../middlewares/multer')
const { uploader } = require('../../middlewares/cloudinary')

const app = express.Router();

app.post('/add', multerUploads.single('syllabus_summary'), (req, res) => {
  const body = _.pick(req.body, [
    'course_id',
    'name',
    'intake',
    'duration',
    'total_semester'
  ]);

  const file = dataUri(req).content;

  uploader.upload(file, { folder: 'Dcrust/' }).then(result => {

    let newBranch = new Branch(body);
    newBranch.syllabus_summary = result.secure_url;
    let branchData;
    let id;

    newBranch.save().then(branch => {
      id = branch._id;
      branchData = branch;
      return Course.findById(body.course_id);
    })
      .then(course => {
        course.branches.push(id);
        return course.save();
      })
      .then(result => {
        return res.send(branchData);
      })
      .catch(e => {
        console.log(e);
      });

  }).catch(e => {
    console.log(e);
  })


});

app.post('/show', (req, res) => {
  let course_id = req.body.course_id;
  Branch.find({ course_id: course_id })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.patch('/edit', multerUploads.single('syllabus_summary'), (req, res) => {
  let branch_id = req.body.branch_id;
  let body = _.pick(req.body, [
    'name',
    'intake',
    'duration',
    'total_semester'
  ]);
  const file = dataUri(req).content;

  uploader.upload(file, { folder: 'Dcrust/' }).then(result => {
    body.syllabus_summary = result.secure_url;
    Branch.findByIdAndUpdate(branch_id, body, { new: true })
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        console.log(e);
      });
  }).catch(e => {
    console.log(e);
  })


});

app.delete('/delete', (req, res) => {
  let branch_id = req.body.branch_id;
  let course_id = req.body.course_id;
  Branch.findByIdAndDelete(branch_id)
    .then(data => {
      if (data) {
        Course.findByIdAndUpdate(
          course_id,
          { $pull: { branches: branch_id } },
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
});

module.exports = app;
