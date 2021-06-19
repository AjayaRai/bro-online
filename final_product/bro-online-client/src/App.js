import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from "axios";
import './App.css';

// Components
import AuthRoute from './util/AuthRoute';
import Navbar from "./components/Navbar";

// Pages
import group from "./pages/group";
import login from "./pages/login";
import home from "./pages/home";
import signup from "./pages/signup";
import search from "./pages/search";

// Redux Stuff
import {SET_AUTHENTICATED} from "./redux/types";
import {logoutUser, getUserData} from './redux/actions/userActions';
import search_grp_bro from "./pages/search_grp_bro";
import {Provider} from 'react-redux';
import store from './redux/store';

// Design Stuff
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import themeObject from './util/theme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
const theme = createMuiTheme(themeObject);


const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar/>
                        <div className={`container`}>
                            <Switch>
                                <Route exact path={`/group/:docId`} component={group}/>
                                <Route exact path={`/`} component={home}/>
                                <Route exact path={`/group/:docId/search`} component={search}/>
                                <Route exact path={`/search_grp_bro`} component={search_grp_bro}/>
                                <AuthRoute exact path={`/login`} component={login}/>
                                <AuthRoute exact path="/signup" component={signup}/>
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    };
}

export default App;
