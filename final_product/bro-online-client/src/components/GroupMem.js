import React, {Component} from 'react';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import RemoveMemberBtn from "./RemoveMemberBtn";

const styles = (theme) => ({
    root: {
        maxWidth: 200,
        float: 'left',
        marginRight: '2em'
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    ...theme.spreadThis
})

class GroupMem extends Component {
    render() {
        const {
            classes,
            name,
            userName
        } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader title={name} />
                <CardMedia
                    className={classes.media}
                    image={`https://i.pinimg.com/736x/22/67/08/226708d840c705bdbe16603236f4ae62.jpg?alt=media`}
                    title={`profile img`}
                />
                <CardActions disbleSpacing>
                    <IconButton aria-label={`remove member`}>
                        <RemoveMemberBtn userName={userName}/>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default (withStyles(styles)(GroupMem));