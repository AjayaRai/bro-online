import React, {Component} from 'react';
import axios from "axios";

class RmvGroupBtn extends Component {

    handleClick = () => {
        let groupDocId = this.props.groupDocId;

        axios
            .delete(`/group/${groupDocId}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            })

    }

    render() {

        return (
            <button onClick={this.handleClick}>
                Delete
            </button>
        );
    }
}

export default RmvGroupBtn;