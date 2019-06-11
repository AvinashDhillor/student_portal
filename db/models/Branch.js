const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  course_id: {
    ref: 'Course',
    type: Schema.Types.ObjectId
  },
  branch_id: {
    ref: 'Course',
    type: Schema.Types.ObjectId
  },
  intake: {
    type: Number
  },
  duration: {
    identifier: {
      type: String
    },
    period: {
      type: Number
    }
  },
  semesters: [
    {
      semester_number: {
        type: String
      },
      syllabus_link: {
        type: String
      },
      subjects: [
        {
          course_title: {
            type: String
          },
          course_code: {
            type: String,
            unique: true
          },
          teaching_schedule: {
            L: {
              type: Number
            },
            T: {
              type: Number
            },
            P: {
              type: Number
            }
          },
          marks_of_classwork: {
            type: Number
          },
          examination_marks: {
            theory: {
              type: Number
            },
            practical: {
              type: Number
            }
          },
          total: {
            type: Number
          },
          credit: {
            type: Number
          },
          exam_duration: {
            type: Number
          }
        }
      ]
    }
  ],
  total_semester: {
    type: Number
  },
  syllabus_summary: {
    type: String
  }
});

module.exports = Branch = mongoose.model('branch', branchSchema);
