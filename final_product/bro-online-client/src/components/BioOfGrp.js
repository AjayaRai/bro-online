import React, {Component} from 'react';
import axios from 'axios';

class BioOfGrp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/group_bio/${this.props.groupDocId}`)
            .then((res) => {
                this.setState({
                    value: res.data.bio
                })
            }).catch((err) => {
            console.error(err);
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        axios
            .post(`/group_bio/${this.props.groupDocId}`, {bio: this.state.value})
            .then(() => {

            }).catch((err) => {
            console.error(err);
        })

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Bio:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default BioOfGrp;