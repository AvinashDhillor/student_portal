import {
  ADD_SEMESTER,
  SHOW_SEMESTER,
  EDIT_SEMESTER,
  DELETE_SEMESTER
} from './type';

import axios from 'axios';

export const addSemester = data => dispatch => {
  axios
    .post('/api/semester/add', data)
    .then(result => {
      if (result.data) {
        dispatch(showSemester({ branch_id: result.data.course_id }));
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const showSemester = data => dispatch => {
  axios
    .post('/api/semester/show', data)
    .then(result => {
      dispatch({
        type: SHOW_SEMESTER,
        payload: result.data
      });
    })
    .catch(e => {
      console.log(e);
    });
};

export const editSemester = data => dispatch => {
  axios
    .patch('/api/semester/edit', data)
    .then(result => {
      if (result) {
        dispatch(showSemester({ branch_id: result.data.branch_id }));
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const deleteSemester = data => dispatch => {
  axios
    .delete('/api/branch/delete', { data: data })
    .then(result => {
      if (result) {
        dispatch(showSemester({ branch_id: result.data.branch_id }));
      }
    })
    .catch(e => {
      console.log(e);
    });
};
