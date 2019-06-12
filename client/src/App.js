import React from 'react';
import logo from './logo.svg';
import './App.css';

import { addCourse, showCourse, editCourse, deleteCourse } from './actions/course'
const data = {
  course_id: "5d00e6ece5ab6224303f95a6",
  category: "lodu",
  name: "Chutiya"
}

// deleteCourse(data);
// addCourse(data);
// showCourse()


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
