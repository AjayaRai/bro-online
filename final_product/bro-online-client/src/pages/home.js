import React, {Component, Fragment} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import RmvGroupBtn from "../components/RmvGroupBtn";
import Image from "../util/homePage_wallpaper.jpg";
import MyButton from '../util/MyButton';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import {Dialog} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    groupBackground: {
        height: `35em`,
        backgroundImage: `url(${Image})`,
        closeButton: {
            position: 'absolute',
            left: '91%',
            top: '6%'
        }
    },
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

class Home extends Component {
    state = {
        groups: [],
        open: false,
        body: ''
    }

    componentDidMount() {
        axios
            .get('/get_my_grps')
            .then((res) => {
                this.setState({
                    groups: res.data
                })
            }).catch((err) => {
            console.error(err);
        })
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
            user: {
                authenticated,
                credentials: { imageUrl },
            },
            classes
        } = this.props;

        if (!authenticated) {
            return <Redirect to={`/signup`} />
        }

        let groups = this.state.groups;
        let grpsFormattedInHTML = [];
        if (groups.length !== 0) {
            for (let i=0; i < groups.length; i++) {
                grpsFormattedInHTML[i] = (
                    <p>
                        <Link to={`/group/${groups[i].docId}`}>
                            {groups[i].name}
                        </Link>
                        <RmvGroupBtn groupDocId={groups[i].docId} />
                    </p>
                );
            }
        }

        return (
            <>
                <Navbar imgUrl={imageUrl}/>

                <div className={classes.groupBackground}>
                    <h1>{`My Groups`}</h1>
                    {grpsFormattedInHTML.length !== 0 ? grpsFormattedInHTML : null}
                </div>

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
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Home));