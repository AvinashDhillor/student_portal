import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  showBranch,
  addBranch,
  deleteBranch,
  editBranch
} from '../../actions/branch';
import BranchForm from './BranchForm';

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_id: '',
      isVisible: false,
      branch: [],
      isEditOpen: false
    };
  }

  componentDidMount() {
    this.setState({
      course_id: this.props.course_id
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.branch !== this.state.branch)
      this.setState({
        branch: nextProps.branch
      });
  }

  openEditDialog = e => {
    let key = e.target.value;
    if (key === '') {
      this.setState({
        isEditOpen: true
      });
    } else {
      this.setState({
        isEditOpen: true,
        currentData: this.state.data[key]
      });
    }
  };

  toggleBranch = () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: false,
        branch: []
      });
    } else {
      this.props.showBranch({ course_id: this.state.course_id });
      this.setState({
        isVisible: true
      });
    }
  };

  addBranch = data => {
    this.props.addBranch(data);
    this.setState({
      isEditOpen: false
    });
  };

  deleteBranch = e => {
    let data = {
      course_id: this.state.course_id,
      branch_id: e.target.value
    };
    this.props.deleteBranch(data);
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleBranch}>
          {this.state.isVisible ? 'Hide ' : 'Show '} Branches
        </button>
        <div
          className="Branch"
          style={{ display: this.state.isVisible ? 'block' : 'none' }}
        >
          <table>
            <tbody>
              {this.state.branch.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.name}</td>
                    <td>{data.intake}</td>
                    <td>{data.total_semester}</td>
                    <td>{data.syllabus_summary}</td>
                    <td>
                      {data.duration.period} {data.duration.identifier}
                    </td>
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      <button>Show Semester</button>
                    </td>
                    <td>
                      <button onClick={this.deleteBranch} value={data._id}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {this.state.isEditOpen ? (
            <BranchForm
              course_id={this.state.course_id}
              addBranch={this.addBranch}
            />
          ) : null}
          <button value="" onClick={this.openEditDialog}>
            Add New Branch
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  branch: state.branch
});

export default connect(
  mapStateToProps,
  { showBranch, addBranch, deleteBranch }
)(Branch);
