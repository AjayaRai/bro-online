import React, {Component} from 'react';
import axios from 'axios';
import AddBtn from "../components/AddBtn";
import Navbar from "../components/Navbar";
import './search.css';

// Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
})

class Group extends Component {
    state = {
        users: null
    }

    componentDidMount() {
        axios
            .get(`/users`)
            .then((res) => {
                this.setState({
                    users: res.data,
                })

            }).catch((err) => {
            console.error(err);
        })
    }

    render() {
        const {
            classes
        } = this.props;

        let user = this.state.users ? (
            this.state.users.map(user =>
                <div className={`inlineUsrDetail`}>
                    <p><Avatar style={{float:"left"}} src={"https://firebasestorage.googleapis.com/v0/b/bro-online-test.appspot.com/o/jack.jpg?alt=media"} />{user.name} <AddBtn userName={user.userName} /></p>
                </div>
            )
        ) : <p></p>;
        return (
            <>
                <Navbar />
                <div>
                    <h1>Search Page</h1>
                    {user}
                </div>
            </>
        );
    }
}

export default withStyles(styles)(Group);