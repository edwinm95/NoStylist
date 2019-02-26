import {combineReducers} from 'redux'
import authReducer from './authReducer'
import googleReducer from './googleReducer';
import facebookReducer from './facebookReducer'
import errorReducer from './errorReducer'


export default combineReducers (
    {
        auth: authReducer,
        google: googleReducer,
        facebook: facebookReducer,
        error: errorReducer

    }
);