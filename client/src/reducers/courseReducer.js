import {
  ADD_COURSE,
  EDIT_COURSE,
  DELETE_COURSE,
  SHOW_COURSE
} from '../actions/type';

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COURSE:
      return action.payload;
    default:
      return state;
  }
};
