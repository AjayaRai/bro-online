import React, {Component} from 'react';
import axios from 'axios';
import AddBtn from "../components/AddBtn";

class Group extends Component {


    state = {
        users: null
    }

    componentDidMount() {

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
        let user = this.state.users ? (
            this.state.users.map(user =>
                <p>{user.name} <AddBtn userName={user.userName}/></p>
            )
        ) : <p>Loading...</p>;
        return (
            <div>
                <h1>Search Page</h1>
                {user}
            </div>
        );
    }
}

export default Group;