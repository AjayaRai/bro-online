import React, {Component} from 'react';
import RemoveMemberBtn from "./RemoveMemberBtn";

class Tribe extends Component {
    render() {
        const {groupMembers} = this.props;

        let groupMember = groupMembers ? (
            groupMembers.map(groupMember => <p>{groupMember.name} <RemoveMemberBtn userName={groupMember.userName}/></p>)
        ) : <p></p>


        return (
            <div>
                <h1>Group Page</h1>
                <h2>Members</h2>
                {groupMember}
            </div>
        );
    }
}

export default Tribe;