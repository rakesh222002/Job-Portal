import { PROFILE_GET, PROFILE_ERR, PROFILE_CLEAR, PROFILE_UPDATE } from "../actions/types";

const initialState = {
    profile: null,
    loading: true,
    error: {}
}

export default function( state= initialState, action) {
    const {type, pl} = action;
    switch(type){
        case PROFILE_GET:
        case PROFILE_UPDATE:
            return {
                ...state,
                profile: pl,
                loading: false
            }
        case PROFILE_ERR:
            return {
                ...state,
                error: pl,
                loading: false
            }
        case PROFILE_CLEAR:
            return {
                ...state,
                profile: null,
            }
        default:
            return state;
    }
}