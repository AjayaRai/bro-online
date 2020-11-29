import React, {Component} from 'react';
import axios from 'axios';
import Tribe from "../components/Tribe";

class Group extends Component {
    state = {
        groupMembers: null,
    }

    componentDidMount() {
        const docId = this.props.match.params.docId;

        axios
            .get(`/groups/${docId}`)
            .then((res) => {
                this.setState({
                    groupMembers: res.data,
                })

            }).catch((err) => {
                console.error(err);
            })
    }

    render() {
        return (
            <div>
                <Tribe groupMembers={this.state.groupMembers ? this.state.groupMembers : null}/>
            </div>
        );
    }
}

export default Group;