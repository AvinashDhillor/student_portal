import React, { Component } from 'react';
import { connect } from 'react-redux';

import CourseForm from './CourseForm';
import Branch from '../branch/Branch';

import {
  addCourse,
  showCourse,
  editCourse,
  deleteCourse
} from '../../actions/course';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isEditOpen: false,
      currentData: null,
      isAdding: false
    };
  }

  componentDidMount() {
    this.props.showCourse();
  }

  componentWillReceiveProps(nexProps) {
    this.setState({
      data: nexProps.getCourses
    });
  }

  deleteCourse = e => {
    let data = {
      course_id: e.target.value
    };
    console.log(data);

    this.props.deleteCourse(data);
    this.props.showCourse();
  };

  editCourse = data => {
    this.props.editCourse(data);
    this.setState({
      isEditOpen: false
    });
  };

  addCourse = data => {
    this.props.addCourse(data);
    this.setState({
      isEditOpen: false,
      isAdding: false
    });
  };

  openEditDialog = e => {
    let key = e.target.value;
    if (key === '') {
      this.setState({
        isAdding: true,
        isEditOpen: true,
        currentData: { _id: '', category: '', name: '' }
      });
    } else {
      this.setState({
        isEditOpen: true,
        currentData: this.state.data[key]
      });
    }
  };

  closeEditDialog = () => {
    this.setState({
      isEditOpen: false
    });
  };

  render() {
    return (
      <div>
        <button value="" onClick={this.openEditDialog}>
          Add New
        </button>
        {this.state.isEditOpen ? (
          <CourseForm
            category={this.state.currentData.category}
            name={this.state.currentData.name}
            id={this.state.currentData._id}
            editCourse={this.state.isAdding ? this.addCourse : this.editCourse}
            closeEditDialog={this.closeEditDialog}
          />
        ) : null}
        {this.state.data.map((data, i) => {
          return (
            <div key={i}>
              <h2>
                <span>
                  {i + 1}.{'  '}
                </span>
                {data.category}
              </h2>
              <p>{data.name}</p>
              <button value={i} onClick={this.openEditDialog}>
                Edit
              </button>
              <button value={data._id} onClick={this.deleteCourse}>
                Delete
              </button>
              <Branch course_id={data._id} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getCourses: state.courses
  };
};

export default connect(
  mapStateToProps,
  {
    showCourse: showCourse,
    deleteCourse: deleteCourse,
    editCourse: editCourse,
    addCourse: addCourse
  }
)(Course);
