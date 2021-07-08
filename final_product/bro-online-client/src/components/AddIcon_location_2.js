import React, {Component, Fragment} from 'react';
import MyButton from "../util/MyButton";
import axios from "axios";

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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

class AddIcon_location_2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            body: ''
        }
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

    handleSubmit = () => {
        const jsonFormatData = {
            name: this.state.body,
            cardLocation: this.props.cardLocation
        }

        axios
            .post('/add_interest', jsonFormatData)
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <div
                style={{
                    position: 'absolute',
                    top:  `20` + 'em',
                    left: '100px',
                    width: '100px',
                    height: '100px'
                }}
            >
                <Fragment>
                    <MyButton onClick={this.handleOpen} tip="Add a group">
                        <AddCircleIcon
                            style={{fill: 'white'}}
                        />
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
                                    rows="1"
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
            </div>
        );
    }
}

export default (withStyles(styles)(AddIcon_location_2));