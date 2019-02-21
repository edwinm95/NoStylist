import {ADD_ERROR, REMOVE_ERROR} from '../actions/types'

export default function (state = null, action){
    switch(action.type){
        case ADD_ERROR:
        return action.error;
        case REMOVE_ERROR:
        return null;
        default:
        return state;
    }
}