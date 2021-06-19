import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import {Link} from "react-router-dom";

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    ...theme.spreadThis
})

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
        this.props.loginUser(userData, this.props.history);
    }
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
                <Grid>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
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
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Login
                        </Button>
                    </form>
                    Not registered? <Link to={`/signup`}>click here</Link>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));