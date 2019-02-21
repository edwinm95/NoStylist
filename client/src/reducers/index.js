import {combineReducers} from 'redux'
import authReducer from './authReducer'
import googleReducer from './googleReducer';
import facebookReducer from './facebookReducer'
import errorReducer from './errorReducer'
import paramReducer from './paramReducers'
import {reducer as formReducer} from 'redux-form'

export default combineReducers (
    {
        auth: authReducer,
        google: googleReducer,
        facebook: facebookReducer,
        error: errorReducer,
        form: formReducer,
        params: paramReducer
    }
);