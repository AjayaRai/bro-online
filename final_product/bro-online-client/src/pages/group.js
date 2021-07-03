import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import BioOfGrp from "../components/BioOfGrp";
import Chat from "../components/Chat";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

// Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import GroupMem from "../components/GroupMemCard";

const styles = (theme) => ({
    addMem_bio_chat: {
        position: 'absolute',
        top: '30em',
        width: '97%'
    },
    ...theme.spreadThis
})

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
            },
            classes
        } = this.props;

        let groupMembers = (typeof this.state.groupMembers != 'undefined') ? (
            this.state.groupMembers.map((groupMember) => <GroupMem name={groupMember.name} userName={groupMember.userName}/>)
        ) : <p></p>;

        return (
            <>
                <Navbar imgUrl={imageUrl}/>
                <h1>Group Page</h1>
                <h2>Members</h2>
                {groupMembers}

                <div className={classes.addMem_bio_chat}>
                    <Link to={`/group/${this.props.match.params.docId}/search`}>
                        Add Member
                    </Link>
                    <br/>
                    <BioOfGrp groupDocId={this.props.match.params.docId}/>
                    <br/>
                    <button onClick={this.handleClick}>
                        {this.state.hideChat ? 'Show Chat' : 'Hide Chat'}
                    </button>
                    {this.state.hideChat ? '' : <Chat imgUrl={imageUrl} name={namee}/>}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Group));