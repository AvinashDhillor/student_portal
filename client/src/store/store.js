import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import courseReducer from '../reducers/courseReducer';
import branchReducer from '../reducers/branchReducer';
import semesterReducer from '../reducers/semesterReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      courses: courseReducer,
      branch: branchReducer,
      semester: semesterReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
