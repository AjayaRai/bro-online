import React, {Component} from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';

// TODO make the remove btn on the GroupMember Page work; since I need make new function on the DB, might wanna use TEST for it? YES
class RemoveMemberBtn extends Component {
    state = {
        docId: ""
    }

    handleClick = () => {
        let userName = this.props.userName;
        let docId = this.extractDocIdFromURL(window.location.pathname);

        this.state.docId = docId;

        let jsonFormat = {
            userName: userName,
            docId: docId
        }

        console.log("jsonFormat", jsonFormat);
        window.location.reload();
    }

    extractDocIdFromURL = (url) => {
        let docIdBeginningIndex = url.indexOf("group/");
        let docIdEndIndex = url.indexOf("/search");

        return url.slice(docIdBeginningIndex + 6, docIdEndIndex);
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