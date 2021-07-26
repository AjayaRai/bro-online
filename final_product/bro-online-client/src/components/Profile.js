import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

// MUI stuff
import Paper from '@material-ui/core/Paper';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import {connect} from 'react-redux';
import {logoutUser, uploadImage} from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes,
            user: {
                credentials: {imageUrl},
            }
        } = this.props;

        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />
                        <MyButton
                            tip="Edit profile picture"
                            onClick={this.handleEditPicture}
                            btnClassName="button"
                        >
                            <EditIcon color="primary"/>
                        </MyButton>
                    </div>
                    <hr/>
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                        <KeyboardReturn color="primary"/>
                    </MyButton>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {logoutUser, uploadImage};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));
