const express = require('express');
const _ = require('lodash');

const Course = require('../../db/models/Course');
const Branch = require('../../db/models/Branch');

const { multerUploads, dataUri } = require('../../middlewares/multer');
const { uploader } = require('../../middlewares/cloudinary');

const app = express.Router();

app.post('/show', (req, res) => {
    let branch_id = req.body.branch_id;
    Branch.findById(branch_id)
        .then(data => {
            res.send(data.semesters);
        })
        .catch(e => {
            console.log(e);
        });
});

app.post('/add', multerUploads.single('syllabus_link'), (req, res) => {
    let branch_id = req.body.branch_id;
    let body = _.pick(req.body, ['semester_number']);

    const file = dataUri(req).content;
    uploader
        .upload(file, { folder: 'Dcrust/' })
        .then(result => {
            body.syllabus_link = result.secure_url;
            Branch.findById(branch_id)
                .then(data => {
                    data.semesters.push(body);
                    return data;
                })
                .then(data => {
                    data.save().then(result => {
                        res.send(result);
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        })
        .catch(e => {
            console.log(e);
        });
});

app.patch('/edit', multerUploads.single('syllabus_link'), (req, res) => {
    let body = _.pick(req.body, ['branch_id', 'semester_id', 'semester_number']);
    const file = dataUri(req).content;

    uploader.upload(file, { folder: 'Dcrust/' }).then(result => {
        Branch.findById(branch_id)
            .then(branch => {
                branch.semesters.forEach(data => {
                    if (data._id.toString() === semester_id.toString()) {
                        data.semester_number = body.semester_number;
                        data.syllabus_link = result.secure_url;
                    }
                });
                return branch.save();
            })
            .then(result => {
                return res.send(result);
            })
            .catch(e => {
                console.log(e);
            });
    });
});

app.delete('/delete', (req, res) => {
    const { branch_id, semester_id } = req.body;
    Branch.findById(branch_id)
        .then(branch => {
            return branch.update(
                { $pull: { semesters: { _id: semester_id } } },
                { new: true }
            );
        })
        .then(result => {
            return res.send(result);
        })
        .catch(e => {
            console.log(e);
        });
});

module.exports = app;
