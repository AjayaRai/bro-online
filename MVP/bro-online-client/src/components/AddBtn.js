import React, {Component} from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';

class AddBtn extends Component {
    state = {
        redirect: false
    }

    handleClick = () => {
        let userName = this.props.userName;
        let docId = this.extractDocIdFromURL(window.location.pathname);

        let jsonFormat = {
            userName: userName,
            docId: docId
        }

        axios
            .post('/add_member', jsonFormat)
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch((err) => {
                console.error(err);
            })
    }

    extractDocIdFromURL = (url) => {
        let docIdBeginningIndex = url.indexOf("group/");
        let docIdEndIndex = url.indexOf("/search");

        return url.slice(docIdBeginningIndex + 6, docIdEndIndex);
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to="/group/5yx2h1tmGPttPIccSuI0" />;
        }

        return (
            <button onClick={this.handleClick}>
                Add
            </button>
        );
    }
}

export default AddBtn;