import { ADD_BRANCH, DELETE_BRANCH, SHOW_BRANCH, EDIT_BRANCH } from './type';

import axios from 'axios';

export const addBranch = data => dispatch => {
  axios
    .post('/api/branch/add', data)
    .then(result => {
      if (result.data) {
        console.log(result.data.course_id);
        dispatch(showBranch({ course_id: result.data.course_id }));
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const showBranch = data => dispatch => {
  axios
    .post('/api/branch/show', data)
    .then(result => {
      dispatch({
        type: SHOW_BRANCH,
        payload: result.data
      });
    })
    .catch(e => {
      console.log(e);
    });
};

export const editBranch = data => dispatch => {
  axios
    .patch('/api/branch/edit', data)
    .then(result => {
      if (result) {
        dispatch(showBranch());
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const deleteBranch = data => dispatch => {
  axios
    .delete('/api/branch/delete', { data: data })
    .then(result => {
      if (result) {
        dispatch(showBranch({ course_id: result.data.course_id }));
      }
    })
    .catch(e => {
      console.log(e);
    });
};
