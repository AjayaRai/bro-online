import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import {logoutUser} from "../redux/actions/userActions";
import {connect} from 'react-redux';
import '../App.css';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        return (
            <AppBar>
                <Toolbar className={`nav-container`}>
                    <Button color="inherit" component={Link} to={`/`}>
                        <HomeIcon fontSize={`large`}/>
                    </Button>
                    <Button color={`inherit`} component={Link} to={`/search_grp_bro`}>
                        <SearchIcon fontSize={`large`}/>
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