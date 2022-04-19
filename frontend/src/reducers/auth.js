import { REGISTER_SUCCESS, REGISTER_UNSUCCESS, USER_LOADED, AUTH_ERR, LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    const { type, pl } = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', pl.token);
            return{
                ...state,
                ...pl,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_UNSUCCESS:
        case LOGIN_UNSUCCESS:
        case AUTH_ERR:
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false  
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: pl
            }
        default:
            return state;
    }
}