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
        schema: [],
    }

    componentDidMount() {
        axios
            .get('/get_interest')
            .then((res) => {
                this.setState({
                    schema: res.data
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

        let schema = this.state.schema;
        let x = [];
        if (schema.length !== 0) {
            for (let i=0; i<schema.length; i++) {
                x[i] = (
                    <p>
                        <Link to={`/group/${schema[i].docId}`}>
                            {schema[i].name}
                        </Link>
                        <RmvGroupBtn groupDocId={schema[i].docId} />
                    </p>
                );
            }
        }

        return (
            <>
                <Navbar imgUrl={imageUrl}/>

                <div>
                    <h1>{`My Interests`}</h1>
                    {x.length !== 0 ? x : null}
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