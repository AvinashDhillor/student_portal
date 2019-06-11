const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  category: {
    type: String
  },
  name: {
    type: String
  },
  branches: [
    {
      ref: 'Branch',
      type: Schema.Types.ObjectId
    }
  ]
});

courseSchema.methods.toJSON = function () {
  let course = this;
  let courseObject = course.toObject();
  return _.pick(courseObject, ['_id', 'category', 'name']);
};

module.exports = Course = mongoose.model('course', courseSchema);
