import React, {Component} from 'react';

class Tribe extends Component {
    render() {
        const {groups} = this.props;

        let groupMembers = groups ? (
            groups.groupMembers.map(groupMember => <p>{groupMember.name}</p>)
        ) : <p>Loading...</p>
        
        return (
            <div>
                <h1>{groups ? groups.name : ''} Group</h1>
                <h2>Members</h2>
                {groupMembers}
            </div>
        );
    }
}

export default Tribe;