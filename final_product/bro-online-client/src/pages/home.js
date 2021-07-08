import React, {Component} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import AddIcon_location_1 from "../components/AddIcon_location_1";
import AddGroup_location_2 from "../components/AddIcon_location_2";

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import GroupCard_1 from "../components/GroupCard_1";
import GroupCard_2 from "../components/GroupCard_2";

const styles = (theme) => ({
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

    compare( a, b ) {
        if ( a.cardLocation < b.cardLocation ){
            return -1;
        }
        if ( a.cardLocation > b.cardLocation ){
            return 1;
        }
        return 0;
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
        let updatedGroupArray = [];
        groups.sort(this.compare)

        for (let i=0; i<2; i++) {
            updatedGroupArray[i] = null;
            for (let j=0; j<groups.length; j++) {
                if (i === groups[j].cardLocation) {
                    updatedGroupArray[i] = groups[j];
                }
            }
        }

        let grpsFormattedInHTML = [];

        if (updatedGroupArray[0] === null) {
            grpsFormattedInHTML[0] = (
                <AddIcon_location_1 cardLocation={0}/>
            )
        } else {
            grpsFormattedInHTML[0] = (
                <GroupCard_1
                    groupId={updatedGroupArray[0].docId}
                    groupName={updatedGroupArray[0].name}
                    groupCard_yAxis={10}
                />
            )
        }

        if (updatedGroupArray[1] === null) {
            grpsFormattedInHTML[1] = (
                <AddGroup_location_2 cardLocation={1}/>
            )
        } else {
            grpsFormattedInHTML[1] = (
                <GroupCard_2
                    groupId={updatedGroupArray[1].docId}
                    groupName={updatedGroupArray[1].name}
                    groupCard_yAxis={20}
                />
            )
        }

        return (
            <>
                <Navbar imgUrl={imageUrl}/>

                <div className={classes.groupBackground}>
                    <h1>{`My Groups`}</h1>
                    {grpsFormattedInHTML.length !== 0 ? grpsFormattedInHTML : null}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Home));