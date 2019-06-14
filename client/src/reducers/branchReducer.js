import {
  ADD_BRANCH,
  DELETE_BRANCH,
  SHOW_BRANCH,
  EDIT_BRANCH
} from '../actions/type';

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_BRANCH:
      return action.payload;
    default:
      return state;
  }
};
