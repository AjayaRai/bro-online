import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    ...theme.spreadThis
});

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            userName: '',
            namee: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            userName: this.state.userName,
            namee: this.state.namee
        };

        this.props.signupUser(newUserData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {
            classes
        } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        SignUp
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        id={`namee`}
                        name={`namee`}
                        type={`namee`}
                        label={`Name`}
                        className={classes.textField}
                        value={this.state.namee}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        id={`userName`}
                        name={`userName`}
                        type={`userName`}
                        label={`User Name`}
                        className={classes.textField}
                        value={this.state.userName}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        id={`email`}
                        name={`email`}
                        type={`email`}
                        label={`Email`}
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        id={`password`}
                        name={`password`}
                        type={`password`}
                        label={`Password`}
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button
                        type={`submit`}
                        variant={`contained`}
                        color={`primary`}
                        className={classes.button}
                    >
                        Sign Up
                    </Button>
                    <br />
                    <small>
                        Already have an account ? Login <Link to="/login">here</Link>
                    </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    { signupUser }
)(withStyles(styles)(signup));