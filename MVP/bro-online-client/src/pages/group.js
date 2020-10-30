import React, {Component} from 'react';
import axios from 'axios';

class Group extends Component {
    // components state
    state = {
        groups: null,
    }
    x;

    componentDidMount() {
        axios.get("/group")
            .then((res) => {
                this.setState({
                    groups: res.data[0],
                })

            }).catch((err) => {
                console.error(err);
        })
    }

    render() {

        let groupMembers = this.state.groups ? (
            this.state.groups.groupMembers.map(groupMember => <p>{groupMember.userName}</p>)
        ) : <p>Loading...</p>

        return (
            <div>
                <h1>{this.state.groups ? this.state.groups.name : ''} Group</h1>
                <h2>Members</h2>
                {groupMembers}
            </div>
        );
    }
}

export default Group;