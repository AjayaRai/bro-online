import React, {Component, Fragment} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import AddInterest from "../components/AddInterest";
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
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {DeleteOutline} from "@material-ui/icons";

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
    card: {
        position: 'absolute',
        top: '310px',
        left: '611px',
        width: '100px',
        height: '100px'
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
        console.log('body', this.state.body);

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

        let test_groups = [
            {
                name: "Fighting",
                docId: "0001",
                location: "1"
            },
            {
                name: "Dancing",
                docId: "0002",
                location: "2"
            }
        ];
        let test_grpsFormattedInHTML = [];

        /*for (let i=0; i < test_groups.length; i++) {
            test_grpsFormattedInHTML[i] = (
                <Card
                    style={{
                        position: 'absolute',
                        top: `${10 + i * 10}` + 'em',
                        left: '611px',
                        width: '100px',
                        height: '100px'

                    }}
                >
                    <CardHeader title={`BKK`} />
                    <MyButton
                        tip={"Delete Scream"}
                        /!*onClick={}
                        btnClassName={}*!/
                    >
                        <DeleteOutline color={`secondary`} />
                    </MyButton>
                </Card>
            );
        }*/
        for (let i=0; i<2; i++) {
            if (test_groups.length !== 0 && typeof test_groups[i] !== 'undefined' && test_groups[i].location === "1") {
                test_grpsFormattedInHTML[i] = (
                    <Card
                        style={{
                            position: 'absolute',
                            top: '10em',
                            left: '611px',
                            width: '100px',
                            height: '100px'

                        }}
                    >
                        <CardHeader title={`BKK`} />
                        <MyButton
                            tip={"Delete Scream"}
                            /*onClick={}
                            btnClassName={}*/
                        >
                            <DeleteOutline color={`secondary`} />
                        </MyButton>
                    </Card>
                );
            } else {
                test_grpsFormattedInHTML[i] = (
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

            if (test_groups.length !== 0 && typeof test_groups[i] !== 'undefined' && test_groups[i].location === "2") {
                test_grpsFormattedInHTML[i] = (
                    <Card
                        style={{
                            position: 'absolute',
                            top: '30em',
                            left: '611px',
                            width: '100px',
                            height: '100px'

                        }}
                    >
                        <CardHeader title={`BJJ`} />
                        <MyButton
                            tip={"Delete Scream"}
                            /*onClick={}
                            btnClassName={}*/
                        >
                            <DeleteOutline color={`secondary`} />
                        </MyButton>
                    </Card>
                );
            } else {
                test_grpsFormattedInHTML[i] = (
                    <Fragment>
                        <MyButton onClick={this.handleOpen} tip="Add a group">
                            <AddIcon
                                style={{
                                    position: 'absolute',
                                    top: '30em',
                                    left: '611px',
                                    width: '100px',
                                    height: '100px'
                                }}
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


        return (
            <>
                <Navbar imgUrl={imageUrl}/>

                <div className={classes.groupBackground}>
                    <h1>{`My Groups`}</h1>
                    {grpsFormattedInHTML.length !== 0 ? grpsFormattedInHTML : null}
                    <AddInterest />
                </div>
                {/* START dialog*/}

                {/*<Fragment>
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
                </Fragment>*/}
                {/* END dialog*/}

                {/* START card */}
                <Card className={classes.card}>
                    <CardHeader title={`AJAYA`} />
                    <MyButton
                        tip={"Delete Scream"}
                        /*onClick={}
                        btnClassName={}*/
                    >
                        <DeleteOutline color={`secondary`} />
                    </MyButton>
                </Card>
                {/* END  card  */}

                {test_grpsFormattedInHTML}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Home));