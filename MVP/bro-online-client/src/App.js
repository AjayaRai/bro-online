import React, {Component} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Redux
import {Provider} from 'react-redux';
import store from './redux/store';

// Components
import AuthRoute from './util/AuthRoute';

// Pages
import group from "./pages/group";
import login from "./pages/login";
import test from "./pages/test";
import home from "./pages/home";
import axios from "axios";
import {SET_AUTHENTICATED} from "./redux/types";

import { logoutUser, getUserData } from './redux/actions/userActions';


const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

// TODO AT trying to understand what am I doing and how am it trying to make it work, and how the authenticated isn't being set to 'true' on redux

// TODO my mistake === brance 4 compare brance 3 on gitbash??

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path={`/group`} component={group}/>
                        <Route exact path={`/`} component={home}/>
                        <AuthRoute exact path={`/login`} component={login} />
                    </Switch>
                </Router>
            </Provider>
        )
    };
}

export default App;
