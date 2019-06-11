const express = require('express');
const _ = require('lodash')

const Course = require('../../db/models/Course');
const Branch = require('../../db/models/Branch');

const app = express.Router();

app.get('/show', (req, res) => {
    let branch_id = req.body.branch_id;
    Branch.findById(branch_id).then(data => {
        res.send(data.semesters);
    }).catch(e => {
        console.log(e);

    })
})

app.post('/add', (req, res) => {
    let branch_id = req.body.branch_id;
    let body = _.pick(req.body, ['semester_number', 'syllabus_link']);
    Branch.findById(branch_id).then(data => {
        data.semesters.push(body);
        return data;
    }).then(data => {
        data.save().then(result => {
            res.send(result)
        })
    }).catch(e => {
        console.log(e);
    })
})

app.patch('/edit', (req, res) => {
    const { branch_id, semester_id, semester_number, syllabus_link } = req.body;
    Branch.findById(branch_id).then(branch => {
        branch.semesters.forEach(data => {
            if (data._id.toString() === semester_id.toString()) {
                data.semester_number = semester_number;
                data.syllabus_link = syllabus_link;
            }
        });
        return branch.save();
    }).then(result => {
        return res.send(result);
    }).catch(e => {
        console.log(e);
    })
})

app.delete('/delete', (req, res) => {
    const { branch_id, semester_id } = req.body;
    Branch.findById(branch_id).then(branch => {
        return branch.update({ $pull: { semesters: { _id: semester_id } } }, { new: true });
    }).then(result => {
        return res.send(result);
    }).catch(e => {
        console.log(e);
    })
})

module.exports = app;
