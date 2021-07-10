import React, {Component} from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import AddIcon_location_1 from "../components/AddIcon_location_1";
import AddIcon_location_2 from "../components/AddIcon_location_2";
import AddIcon_location_3 from "../components/AddIcon_location_3";
import AddIcon_location_4 from "../components/AddIcon_location_4";

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import GroupCard_1 from "../components/GroupCard_1";
import GroupCard_2 from "../components/GroupCard_2";
import GroupCard_3 from "../components/GroupCard_3";
import GroupCard_4 from "../components/GroupCard_4";

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
        console.log("groups", groups);
        if (groups.length !== 0) {
            if (groups[0] === null) {
                grpsFormattedInHTML[0] = (
                    <AddIcon_location_1
                        cardLocation={0}
                        yAxis={10}
                    />
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
                    <AddIcon_location_2
                        cardLocation={1}
                        yAxis={20}
                    />
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

            if (groups[2] === null) {
                grpsFormattedInHTML[2] = (
                    <AddIcon_location_3
                        cardLocation={2}
                        groupCard_yAxis={30}
                    />
                )
            } else {
                grpsFormattedInHTML[2] = (
                    <GroupCard_3
                        groupId={groups[2].docId}
                        groupName={groups[2].name}
                        groupCard_yAxis={30}
                    />
                )
            }

            if (groups[3] === null) {
                grpsFormattedInHTML[3] = (
                    <AddIcon_location_4
                        cardLocation={3}
                        yAxis={40}
                    />
                )
            } else {
                grpsFormattedInHTML[3] = (
                    <GroupCard_4
                        groupId={groups[3].docId}
                        groupName={groups[3].name}
                        groupCard_yAxis={40}
                    />
                )
            }
        } else {
            grpsFormattedInHTML[0] = (
                <AddIcon_location_1
                    cardLocation={0}
                    yAxis={10}
                />
            );

            grpsFormattedInHTML[1] = (
                <AddIcon_location_2
                    cardLocation={1}
                    yAxis={20}
                />
            );

            grpsFormattedInHTML[2] = (
                <AddIcon_location_3
                    cardLocation={2}
                    yAxis={30}
                />
            );

            grpsFormattedInHTML[3] = (
                <AddIcon_location_4
                    cardLocation={3}
                    yAxis={40}
                />
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