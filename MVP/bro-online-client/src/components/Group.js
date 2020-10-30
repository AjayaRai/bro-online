import React, {Component} from 'react';

class Group extends Component {
    render() {
        const {
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;
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