import React, {Component} from 'react';

class Tribe extends Component {
    render() {
        const {group} = this.props;

        let groupMembers = group ? (
            group.groupMembers.map(groupMember => <p>{groupMember.name}</p>)
        ) : <p>Loading...</p>
        
        return (
            <div>
                <h1>{group ? group.name : ''} Group</h1>
                <h2>Members</h2>
                {groupMembers}
            </div>
        );
    }
}

export default Tribe;