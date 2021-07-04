import React, {Component, Fragment} from 'react';
import MyButton from "../util/MyButton";
import axios from "axios";

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from "@material-ui/icons/Add";
import {Dialog} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    ...theme.spreadThis
})

class AddGroup extends Component {
    state = {
        open: false,
        body: ''
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = (event) => {
        const x = {
            name: this.state.body
        }

        axios
            .post('/add_interest', x)
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Add a group">
                    <AddIcon/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onCLose={this.handleClose}
                    fullWith
                    maxWith={`sm`}
                >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Add a group</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Group Name"
                                multiline
                                rows="3"
                                placeholder="Name your group"
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                            >
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

export default (withStyles(styles)(AddGroup));