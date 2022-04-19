import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_UNSUCCESS, USER_LOADED, AUTH_ERR, LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT, PROFILE_CLEAR } from './types';
import { setAlert } from '../actions/alert';
import setAuthToken from '../tools/setAuthToken';

//user loading
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('auth');
        dispatch({
            type: USER_LOADED,
            pl: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERR,
        })
    }
}

//user signup

export const signup = ({name, email, password, usertype}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password, usertype});
    try {
        const res = await axios.post('/user', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            pl: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: REGISTER_UNSUCCESS,
        });
    }
}

//login user

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password});

    try {
        const res = await axios.post('/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            pl: res.data
        });
        dispatch(loadUser());
    }
    catch (err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_UNSUCCESS,
        });
    }
}

//logout
export const logout = () => dispatch => {
    dispatch({ type: PROFILE_CLEAR});
    dispatch({type: LOGOUT});
}