import React, {Component} from 'react';
import axios from 'axios';
import Tribe from "../components/Tribe";

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

        return (
            <div>
                <Tribe groups={this.state.groups ? this.state.groups : null}/>
            </div>
        );
    }
}

export default Group;