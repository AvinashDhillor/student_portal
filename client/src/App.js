import React from 'react';
import './App.css';

import { Provider } from "react-redux";
import store from './store/store'
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <div>
      <Provider store={store()}>
        <Dashboard></Dashboard>
      </Provider>
    </div>
  );
}

export default App;
