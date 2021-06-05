import React, {Component} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import AddInterest from "../components/AddInterest";
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import RmvGroupBtn from "../components/RmvGroupBtn";

class Home extends Component {
    state = {
        groups: [],
    }

    componentDidMount() {
        axios
            .get('/get_my_grps')
            .then((res) => {
                this.setState({
                    groups: res.data
                })
            }).catch((err) => {
            console.error(err);
        })
    }

    render() {
        const {
            user: {
                authenticated,
                credentials: { imageUrl },
            }
        } = this.props;

        if (!authenticated) {
            return <Redirect to={`/signup`} />
        }

        let groups = this.state.groups;
        let grpsFormattedInHTML = [];
        if (groups.length !== 0) {
            for (let i=0; i < groups.length; i++) {
                grpsFormattedInHTML[i] = (
                    <p>
                        <Link to={`/group/${groups[i].docId}`}>
                            {groups[i].name}
                        </Link>
                        <RmvGroupBtn groupDocId={groups[i].docId} />
                    </p>
                );
            }
        }

        return (
            <>
                <Navbar imgUrl={imageUrl}/>

                <div>
                    <h1>{`My Groups`}</h1>
                    {grpsFormattedInHTML.length !== 0 ? grpsFormattedInHTML : null}
                    <AddInterest />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(
    mapStateToProps,
)(Home);