import React, {Component} from 'react';
import './SidebarOption.css';
//import Icon from "@material-ui/core/Icon";
import {InsertComment} from "@material-ui/icons";
import {useHistory} from 'react-router-dom';
import db from "./firebase";

function SidebarOption({Icon, title, id, addChannelOption}) {
    const history = useHistory();

    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`)
        } else {
            history.push(title)
        }
    }

    const addChannel = () => {
        const channelName = prompt('Enter the channel name');

        if (channelName) {
            db.collection('rooms').add({
                name: channelName
            })
        }
    }

    return (
        <div className={`sidebarOption`} onClick={addChannelOption ? addChannel : selectChannel}>
            {/* Not sure if the below code is working */}
            {Icon && <Icon className={`sidebarOption__icon`}/>}
            {Icon ? (
                <h3>{title}</h3>
            ): (
                <h3 className={`sidebarOption__channel`}>
                    <span className={`sidebarOption__hash`}>#</span> {title}
                </h3>
            )}
        </div>
    );
}

export default SidebarOption;