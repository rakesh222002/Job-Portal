import axios from 'axios';
import { setAlert } from './alert';
import { JOB_GET, JOB_ERR } from './types';

export const getJobs = () => async dispatch => {
    try {
        const res_allJobs = await axios.get('/profileRecruiter/jobs');
        const res_recJobs = await axios.get('/profileRecruiter/jobs/recruiter')
        dispatch({
            type: JOB_GET,
            pl_allJobs: res_allJobs.data,
            pl_recJobs: res_recJobs.data,
        });
    } catch (err) {
        dispatch({
            type: JOB_ERR,
            pl_allJobs: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

//add job

export const addJob = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/profileRecruiter/jobs', formData, config);

        dispatch(setAlert('Job added','success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: JOB_ERR,
            pl: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

//deleteJob
export const deleteJob = id => async dispatch => {
    try {
        const res = await axios.delete(`/profileRecruiter/jobs/${id}`);
        dispatch(setAlert('Job deleted','success'));
        dispatch(getJobs());
    } catch (err) {
        dispatch({
            type: JOB_ERR,
            pl: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

//editJob

export const editJob = id => async dispatch => {
    try {
        
    } catch (err) {
        
    }
}