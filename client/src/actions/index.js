import axios from 'axios';
import {FETCH_USER, GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID, ADD_ERROR , REMOVE_ERROR} from './types'

export const fetchUser = () => async dispatch => { 
        const response = await axios.get('/api/current_user')
        dispatch({type: FETCH_USER, payload: response.data})
    }

export const fetchGoogleClientID = () => async dispatch => {
        const response = await axios.get('/api/googleClientID')
        dispatch({type: GOOGLE_CLIENT_ID, payload: response.data})
}
export const fetchFacebookClientID = () => async dispatch => {
        const response = await axios.get('/api/facebookClientID')
        dispatch({type: FACEBOOK_CLIENT_ID, payload: response.data})
}

export const addError = (error) => async dispatch => {
        dispatch({type: ADD_ERROR, error: error})
}
export const removeError = () => async dispatch => {
        dispatch({type: REMOVE_ERROR});
}
