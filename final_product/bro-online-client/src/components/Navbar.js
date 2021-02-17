import React from 'react';
import LogOutBtn from "./LogOutBtn";
import { Link } from 'react-router-dom';
import "./Navbar.css";
import HomeIcon from '@material-ui/icons/Home';
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from '@material-ui/icons/Search';

function Navbar({imgUrl}) {

    return (
        <div className={`header`}>
            <div className="header__info">
                <Avatar src={imgUrl}/>
                <h4>HardCoded name</h4>
            </div>
            <Link to="/">
                <div className={`header__option`}>
                    <HomeIcon fontSize={`large`}/>
                </div>
            </Link>
            <Link to="/search_grp_bro">
                <div className={`header__option`}>
                    <SearchIcon fontSize={`large`}/>
                </div>
            </Link>
            <LogOutBtn />
        </div>
    )
}

export default Navbar;