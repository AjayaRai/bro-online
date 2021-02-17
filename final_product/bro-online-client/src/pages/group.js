import React, {Component} from 'react';
import axios from 'axios';
import Tribe from "../components/Tribe";
import AddMember from "../components/AddMember";
import Navbar from "../components/Navbar";
import BioOfGrp from "../components/BioOfGrp";
import Chat from "../components/Chat";
import {connect} from "react-redux";

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {groupMembers: null};
        this.state = {hideChat: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
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

    handleClick() {
        this.setState(prevState => ({
            hideChat: !prevState.hideChat
        }));
    }

    render() {
        const {
            user: {
                credentials: { imageUrl, namee },
            }
        } = this.props;

        return (
            <>
                <Navbar imgUrl={imageUrl}/>
                <div>
                    <Tribe groupMembers={this.state.groupMembers ? this.state.groupMembers : null}/>
                    <AddMember docId={this.props.match.params.docId}/>
                </div>

                <br/>

                <BioOfGrp groupDocId={this.props.match.params.docId}/>

                <br/>

                <button onClick={this.handleClick}>
                    {this.state.hideChat ? 'Show Chat' : 'Hide Chat'}
                </button>
                {this.state.hideChat ? '' : <Chat imgUrl={imageUrl} name={namee}/>}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(
    mapStateToProps
)(Group);