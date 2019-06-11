const express = require('express');

const Branch = require('../../db/models/Branch')

const app = express.Router();

const _ = require('lodash');

app.post('/add', (req, res) => {
    const { branch_id, semester_id } = req.body;
    const body = _.pick(req.body, ['course_title', 'course_code', 'teaching_schedule', 'marks_of_classwork', 'examination_marks', 'total', 'credit', 'exam_duration']);

    console.log(body);

    Branch.findById(branch_id).then(branch => {
        branch.semesters.forEach(semester => {
            console.log(semester._id);

            if (semester._id.toString() == semester_id.toString()) {
                console.log("2");
                semester.subjects.push(body)
            }
        });
        return branch.save();
    }).then(result => {
        return res.send(result);
    }).catch(e => {
        console.log(e);
    })

})

app.patch('/edit', (req, res) => {
    const { branch_id, semester_id, subject_id } = req.body;
    const body = _.pick(req.body, ['course_title', 'course_code', 'teaching_schedule', 'marks_of_classwork', 'examination_marks', 'total', 'credit', 'exam_duration']);



    Branch.findOneAndUpdate({ "semesters.subjects._id": subject_id }, { $set: { "semesters.$.subjects": body } }, { new: true }).then(subject => {
        return res.send(subject);

    }).catch(e => {
        console.log(e);

    })


})


app.delete("/delete", (req, res) => {
    let { branch_id, semester_id, subject_id } = req.body;
    let newBranch;
    Branch.findById(branch_id).then(branch => {
        newBranch = branch;
        return branch;
    }).then(branch => {
        branch.semesters.forEach(semester => {
            if (semester._id.toString() === semester_id.toString()) {
                let newData = semester.subjects.filter(data => {
                    return data._id.toString() !== subject_id
                })
                semester.subjects = newData;

            }
        });
        return branch.save();
    }).then(newData => {
        res.send(newData);
    }).catch(e => {
        console.log(e);
    })
})

module.exports = app;
