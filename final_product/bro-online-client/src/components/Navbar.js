import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from '@material-ui/icons/Search';
import {logoutUser} from "../redux/actions/userActions";
import {connect} from 'react-redux';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Avatar src={"https://firebasestorage.googleapis.com/v0/b/bro-online-test.appspot.com/o/jack.jpg?alt=media"}
                    />
                    <Button color="inherit" component={Link} to={`/`}>
                        <HomeIcon fontSize={`large`}/>
                    </Button>
                    <Button color={`inherit`} component={Link} to={`/search_grp_bro`}>
                        <SearchIcon fontSize={`large`}/>
                    </Button>
                    <Button color={`inherit`} onClick={this.handleLogout} component={Link} to={`/`}> {/*Note redirecting to the home page leads to the sign up page because once the token has been removed we are automatically redirected to the Sign Up Page due to the AuthRoute on the App.js*/}
                        <ExitToAppIcon fontSize={`large`}/>
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {logoutUser};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);