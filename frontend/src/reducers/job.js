import { JOB_GET, JOB_ERR, JOB_CLEAR } from "../actions/types";

const initialState = {
    allJobs: [],
    recJobs: [],
    appJobs: [],
    loading: true,
    error: {}
}

export default function( state= initialState, action) {
    const {type, pl_allJobs, pl_recJobs, pl_appJobs} = action;
    switch(type){
        case JOB_GET:
            return {
                ...state,
                allJobs: pl_allJobs,
                recJobs: pl_recJobs,
                appJobs: pl_appJobs,
                loading: false
            }
        case JOB_ERR:
            return {
                ...state,
                error: pl_allJobs,
                loading: false
            }
        case JOB_CLEAR:
            return {
                ...state,
                allJobs: null,
                recJobs: null,
                appJobs: null,
            }
        default:
            return state;
    }
}