//import { SET_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    axios
        .post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            //dispatch(getUserData());
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                payload: err.response.data
            });
        });
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

/*export const getUserData = () => (dispatch) => {
    axios
        .get('/user')
        .then((res) => {
            dispatch({
                //type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};*/
