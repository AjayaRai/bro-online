import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RmvGroupBtn from "./RmvGroupBtn";

// Material UI stuff
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

class GroupCard_4 extends Component {
    render() {
        const {
            groupId,
            groupName,
            groupCard_yAxis,
            xAxis
        } = this.props;

        return (
            <p>
                <Card
                    style={{
                        position: 'absolute',
                        top:  `${groupCard_yAxis}` + 'em',
                        left: `${xAxis}` + 'em',
                        width: '100px',
                        height: '100px'
                    }}
                >
                    <Link to={`/group/${groupId}`}>
                        <CardHeader title={groupName} />
                    </Link>
                    <RmvGroupBtn groupDocId={groupId} />
                </Card>
            </p>
        );
    }
}

export default GroupCard_4;