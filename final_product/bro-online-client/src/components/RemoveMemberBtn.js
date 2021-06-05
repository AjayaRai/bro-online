import React, {Component} from 'react';
import axios from "axios";

class RemoveMemberBtn extends Component {

    handleClick = () => {
        let userName = this.props.userName;
        let docId = this.extractDocIdFromURL(window.location.pathname);

        axios
            .delete(`/group/${docId}/groupMember/${userName}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            })
    }

    extractDocIdFromURL = (url) => {
        let docIdBeginningIndex = url.indexOf("group/");

        return url.slice(docIdBeginningIndex + 6, url.length);
    }

    render() {

        return (
            <button onClick={this.handleClick}>
                Remove
            </button>
        );
    }
}

export default RemoveMemberBtn;