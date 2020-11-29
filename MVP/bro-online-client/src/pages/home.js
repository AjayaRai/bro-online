import React, {Component} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddInterest from "../components/AddInterest";

class Home extends Component {
    state = {
        schema: []
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
        let x = this.state.schema ? (
            this.state.schema.map(schema => <p><Link to={`/group/${schema.docId}`}>{schema.name}</Link></p>)
        ) : <p>Loading...</p>
        return (
            <div>
                <h1>{`My Interests`}</h1>
                {x}
                <AddInterest />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Home);