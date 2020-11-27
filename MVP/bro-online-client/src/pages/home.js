import React, {Component} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {
        interests: []
    }

    componentDidMount() {
        axios
            .get('/get_interest')
            .then((res) => {
                this.setState({
                    interests: res.data
                })
            }).catch((err) => {
            console.error(err);
        })
    }


    render() {
        let x = this.state.interests ? (
            this.state.interests.map(interest => <p><Link to={`/group`}>{interest.name}</Link></p>)
        ) : <p>Loading...</p>
        return (
            <div>
                <h1>{`My Interests`}</h1>
                {x}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Home);