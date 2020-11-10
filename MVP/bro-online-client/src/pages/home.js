import React, {Component} from 'react';
import axios from "axios";

class Home extends Component {
    state = {
        interests: []
    }

    componentDidMount() {
        axios
            .get('/interest')
            .then((res) => {
                console.log('XXX');
                console.log(res.data)
                this.setState({
                    interests: res.data
                })
            }).catch((err) => {
                console.error(err);
            })
    }

    render() {
        let x = this.state.interests ? (
            this.state.interests.map(interest => <p>{interest.name}</p>)
        ) : <p>Loading...</p>

        return (
            <div>
                <h1>{x}</h1>
            </div>
        );
    }
}

export default Home;