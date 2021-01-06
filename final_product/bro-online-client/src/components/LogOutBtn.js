import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {logoutUser} from "../redux/actions/userActions";
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class LogOutBtn extends Component {
    state = {
        redirect: false
    }

    handleLogout = () => {
        this.props.logoutUser();
        this.setState({redirect: true});
    };

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to={`/login`} />;
        }

        return (
            <button id={`logout__btn`} onClick={this.handleLogout}>
                <div className={`header__option`}>
                    <ExitToAppIcon fontSize={`large`}/>
                </div>
            </button>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {logoutUser};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(LogOutBtn);