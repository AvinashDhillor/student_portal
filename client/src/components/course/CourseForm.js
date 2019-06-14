import React, { Component } from 'react';

export default class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_id: '',
      category: '',
      name: ''
    };
  }

  componentDidMount() {
    this.setState({
      course_id: this.props.id,
      category: this.props.category,
      name: this.props.name
    });
  }

  handleCategory = e => {
    let data = e.target.value;
    this.setState({
      category: data
    });
  };

  handleName = e => {
    let data = e.target.value;
    this.setState({
      name: data
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.editCourse(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleCategory}
            type="text"
            value={this.state.category}
            name="category"
          />
          <input
            onChange={this.handleName}
            type="text"
            value={this.state.name}
            name="name"
          />
          <input type="hidden" value={this.state.course_id} name="id" />
          <input type="submit" value="Save" />
        </form>
        <button onClick={this.props.closeEditDialog}>Close</button>
      </div>
    );
  }
}
