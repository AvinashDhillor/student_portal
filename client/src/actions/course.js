import { ADD_COURSE, EDIT_COURSE, DELETE_COURSE, SHOW_COURSE } from './type';

import axios from 'axios';

export const addCourse = data => dispatch => {
  axios
    .post('/api/course/add', data)
    .then(result => {
      if (result.data) {
        dispatch(showCourse());
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const showCourse = () => dispatch => {
  axios
    .get('/api/course/show')
    .then(result => {
      dispatch({
        type: SHOW_COURSE,
        payload: result.data
      });
    })
    .catch(e => {
      console.log(e);
    });
};

export const editCourse = data => dispatch => {
  axios
    .patch('/api/course/edit', data)
    .then(result => {
      if (result) {
        dispatch(showCourse());
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const deleteCourse = data => dispatch => {
  axios
    .delete('/api/course/delete', { data: data })
    .then(result => {
      if (result) {
        dispatch(showCourse());
      }
    })
    .catch(e => {
      console.log(e);
    });
};
