//import { SET_USER } from '../types';
import axios from 'axios';
import {SET_UNAUTHENTICATED, SET_USER} from "../types";

export const loginUser = (userData, history) => (dispatch) => {
    axios
        .post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                payload: err.response.data
            });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
}

export const getUserData = () => (dispatch) => {
    axios
        .get('/users')
        .then((res) => {
            console.log('AAAJJJ');
            console.log(res.data)
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}
