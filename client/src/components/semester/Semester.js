import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  showSemester,
  addSemester,
  deleteSemester,
  editSemester
} from '../../actions/semester';

class Semester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_id: '',
      branch_id: '',
      isVisible: false,
      semester: []
    };
  }

  componentWillMount() {
    this.setState({
      course_id: this.props.course_id,
      branch_id: this.props.branch_id
    });
  }

  toggleBranch = () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: false,
        semester: []
      });
    } else {
      this.props.showSemester({
        course_id: this.state.course_id,
        branch_id: this.state.branch_id
      });
      this.setState({
        isVisible: true
      });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleBranch}>
          {this.state.isVisible ? 'Hide ' : 'Show '} Semester
        </button>
        <div style={{ display: this.state.isVisible ? 'block' : 'none' }}>
          this is semester data
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    semester: state.semester
  };
};

export default connect(
  mapStateToProps,
  { addSemester, showSemester, deleteSemester, editSemester }
)(Semester);
