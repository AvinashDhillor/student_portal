import React, { Component } from 'react';

export default class BranchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      intake: '',
      course_id: '',
      identifier: '',
      period: '',
      total_semester: '',
      syllabus_summary: ''
    };
  }

  componentDidMount() {
    this.setState({
      course_id: this.props.course_id
    });
  }

  handleName = e => {
    let data = e.target.value;
    this.setState({
      name: data
    });
  };

  handleIntake = e => {
    let data = e.target.value;
    this.setState({
      intake: data
    });
  };

  handleIdentifier = e => {
    let data = e.target.value;
    this.setState({
      identifier: data
    });
  };

  handlePeriod = e => {
    let data = e.target.value;
    this.setState({
      period: data
    });
  };

  handleTotalSemester = e => {
    let data = e.target.value;
    this.setState({
      total_semester: data
    });
  };

  handleSyllabusSummary = e => {
    let data = e.target.value;
    this.setState({
      syllabus_summary: data
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let data = {
      course_id: this.state.course_id,
      name: this.state.name,
      intake: this.state.intake,
      duration: {
        identifier: this.state.identifier,
        period: this.state.period
      },
      total_semester: this.state.total_semester,
      syllabus_summary: this.state.syllabus_summary
    };
    this.props.addBranch(data);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            onChange={this.handleName}
            type="text"
            value={this.state.name}
            name="name"
          />
          <label>Intake</label>
          <input
            onChange={this.handleIntake}
            type="text"
            value={this.state.intake}
            name="intake"
          />
          <label>TotalSemester</label>
          <input
            onChange={this.handleTotalSemester}
            type="text"
            value={this.state.total_semester}
            name="total_semester"
          />
          <label>syllabus_summary</label>
          <input
            onChange={this.handleSyllabusSummary}
            type="text"
            value={this.state.syllabus_summary}
            name="syllabus_summary"
          />
          <label>Year</label>
          <input
            onChange={this.handleIdentifier}
            type="text"
            value={this.state.identifier}
            name="identifier"
          />
          <label>Period</label>
          <input
            onChange={this.handlePeriod}
            type="text"
            value={this.state.period}
            name="period"
          />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}
