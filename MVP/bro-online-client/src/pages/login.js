import React, {Component} from 'react';
import axios from "axios";

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        axios
            .post('/login', userData)
            .then((res) => {
                console.log(res.data);
                this.props.history.push('/group');
            })
            .catch((err) => {
                console.error(err);
            });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <input id={`email`} name={`email`} type={`text`} value={this.state.email} onChange={this.handleChange}/>
                    <input id={`password`} name={`password`} type={`text`} value={this.state.password} onChange={this.handleChange}/>

                    <input type={`submit`} value={`Login`}/>
                </form>
            </div>
        );
    }
}

export default login;