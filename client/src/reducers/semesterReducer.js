import {
  ADD_SEMESTER,
  SHOW_SEMESTER,
  EDIT_SEMESTER,
  DELETE_SEMESTER
} from '../actions/type';

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SEMESTER:
      return action.payload;
    default:
      return state;
  }
};
