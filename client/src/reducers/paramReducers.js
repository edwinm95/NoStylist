import {ADD_PARAMS, REMOVE_PARAMS} from '../actions/types'

export default function (state = null, action) {
    switch(action.type){
        case ADD_PARAMS:
            return action.payload;
        case REMOVE_PARAMS:
            return null;
        default:
            return state;
    }
}