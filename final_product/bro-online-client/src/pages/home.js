import React, {Component} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Image from "../util/homePage_wallpaper.jpg";
import AddGroup from "../components/AddGroup";

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import GroupCard from "../components/GroupCard";

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
    ...theme.spreadThis
})

class Home extends Component {
    state = {
        groups: [],
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
                    <GroupCard groupId={groups[i].docId} groupName={groups[i].name} cardLocation_yAxis={i} />
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
                <AddGroup />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Home));