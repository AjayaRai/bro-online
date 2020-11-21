import React, {Component} from 'react';
import axios from 'axios';
import Tribe from "../components/Tribe";


// TODO probelm 'replace' of undefined, login with 'user10email.com' to fix it? This user shouldn't be logging in?
class Group extends Component {
    state = {
        group: null,
    }

    componentDidMount() {
        axios
            .get("/group")
            .then((res) => {
                this.setState({
                    group: res.data[0],
                })

            }).catch((err) => {
                console.error(err);
            })
    }

    render() {
        return (
            <div>
                <Tribe group={this.state.group ? this.state.group : null}/>
            </div>
        );
    }
}

export default Group;