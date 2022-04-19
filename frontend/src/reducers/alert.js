import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

export default function(state = initialState, action) {
    const {type, pl} = action;
    switch(type){
        case SET_ALERT:
            return [...state, pl];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== pl)
        default:
            return state;
    }
}