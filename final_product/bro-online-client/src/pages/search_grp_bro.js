import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import JoinAgrp from "../components/JoinAgrp";
import {connect} from "react-redux";

class search_grp_bro extends Component {
    state = {
        users: null,
        groups: null
    }

    componentDidMount() {
        axios
            .get(`/groups`)
            .then((res) => {
                this.setState({
                    groups: res.data
                })
            }).catch((err) => {
                console.error(err);
        })

        axios
            .get(`/users`)
            .then((res) => {
                this.setState({
                    users: res.data,
                })
            }).catch((err) => {
            console.error(err);
        })
    }

    render() {
        let group = this.state.groups ? (
            this.state.groups.map((group) =>
                <p>
                    {group.name}   <JoinAgrp userName={this.props.user.credentials.userName} groupId={group.docId}/>
                </p>
            )
        ) : <></>;

        let user = this.state.users ? (
            this.state.users.map(user =>
                <p>{user.name}</p>
            )
        ) : <></>;
        return (
            <>
                <Navbar />
                <h1>Search Page</h1>
                <div>
                    <h3>Users</h3>
                    {user}
                </div>
                <div>
                    <h3>Groups</h3>
                    {group}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(
    mapStateToProps,
)(search_grp_bro);