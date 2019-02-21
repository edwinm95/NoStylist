
import {GOOGLE_CLIENT_ID} from '../actions/types'
export default function (state = null, action) {
    switch(action.type){
        case GOOGLE_CLIENT_ID:
            return action.payload;
        default:
            return state;
    }
}