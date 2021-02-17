import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class JoinAgrp extends Component {
    state = {
        redirect: false
    }

    handleClick = () => {
        let userName = this.props.userName;
        let groupId = this.props.groupId;

        let jsonFormat = {
            userName: userName,
            docId: groupId
        }

        axios
            .post('/add_member', jsonFormat)
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to={`/`} />;
        }

        return (
            <button onClick={this.handleClick}>Join</button>
        );
    }
}

export default JoinAgrp;