import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_GET, PROFILE_ERR, PROFILE_UPDATE } from './types';

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/profileApplicant/me');
        dispatch({
            type: PROFILE_GET,
            pl: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            pl: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const createProfileApp = (formData, history, edit=false) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/profileApplicant', formData, config);
        dispatch({
            type: PROFILE_GET,
            pl: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));

        if(!edit){
            history.push('/profile');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERR,
            pl: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const createProfileRec = (formData, history, edit=false) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/profileRecruiter', formData, config);
        dispatch({
            type: PROFILE_GET,
            pl: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));

        if(!edit){
            history.push('/profile');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERR,
            pl: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

//add education

export const addEducation = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/profileApplicant/education', formData, config);
        dispatch({
            type: PROFILE_UPDATE,
            pl: res.data
        });

        dispatch(setAlert('Education added','success'));
        history.push('/profile');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERR,
            pl: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

//delete edu
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/profileApplicant/education/${id}`);
        dispatch({
            type: PROFILE_UPDATE,
            pl: res.data
        });
        dispatch(setAlert('Education deleted','success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERR,
            pl: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

