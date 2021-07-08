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
        let grpsFormattedInHTML = [];

        if (groups.length !== 0) {
            if (groups[0] === null) {
                grpsFormattedInHTML[0] = (
                    <AddIcon_location_1 cardLocation={0}/>
                )
            } else {
                grpsFormattedInHTML[0] = (
                    <GroupCard_1
                        groupId={groups[0].docId}
                        groupName={groups[0].name}
                        groupCard_yAxis={10}
                    />
                )
            }

            if (groups[1] === null) {
                grpsFormattedInHTML[1] = (
                    <AddGroup_location_2 cardLocation={1}/>
                )
            } else {
                grpsFormattedInHTML[1] = (
                    <GroupCard_2
                        groupId={groups[1].docId}
                        groupName={groups[1].name}
                        groupCard_yAxis={20}
                    />
                )
            }
        } else {
            grpsFormattedInHTML[0] = (
                <AddIcon_location_1 cardLocation={0}/>
            );

            grpsFormattedInHTML[1] = (
                <AddGroup_location_2 cardLocation={1}/>
            );
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