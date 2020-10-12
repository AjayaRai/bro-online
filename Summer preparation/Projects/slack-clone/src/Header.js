import React, {Component} from 'react';
import './Header.css';
import {Avatar} from "@material-ui/core";
import {AccessTime, Help, Search} from "@material-ui/icons";
import {useStateValue} from "./StateProvider";

function Header() {
    const [{user}] = useStateValue();

    return (
        <div className={`header`}>
            <div className={`header__left`}>
                {/* Avatar for logged in user */}
                <Avatar className={`header__avatar`} alt={user?.displayName} src={user?.photoURL}/>
                {/* Time icon */}
                <AccessTime/>
            </div>
            <div className={`header__search`}>
                {/* Search Icon */}
                <Search/>
                {/* input */}
                <input placeholder={`Search C programmer`}/>
            </div>
            <div className={`header__right`}>
                {/* help icon */}
                <Help/>
            </div>
        </div>
    );
}

export default Header;