import { ADD_COURSE, EDIT_COURSE, DELETE_COURSE, SHOW_COURSE } from './type'

import axios from 'axios'


export const addCourse = (data) => {
    axios.post('/api/courses/add', data).then(result => {
        console.log(result.data);
    }).catch(e => {
        console.log(e);
    })
}

export const showCourse = () => {
    axios.get('/api/courses/show').then(result => {
        console.log(result.data);
    }).catch(e => {
        console.log(e);

    })
}


export const editCourse = (data) => {
    console.log('edit');
    axios.patch('/api/courses/edit', data).then((result) => {
        console.log(result.data)
    }).catch(e => {
        console.log(e);
    })
}

export const deleteCourse = (data) => {
    axios.delete('/api/courses/delete', { data: data }).then(result => {
        console.log(result.data);
    }).catch(e => {
        console.log(e);
    })
}
