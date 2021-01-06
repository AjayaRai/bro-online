import React from 'react';
import LogOutBtn from "./LogOutBtn";
import { Link } from 'react-router-dom';
import "./Navbar.css";
import HomeIcon from '@material-ui/icons/Home';

// TODO style via fb-clone OR like the social ape???
function Navbar() {
    return (
        <div className={`header`}>
            <Link to="/">
                <div className={`header__option`}>
                    <HomeIcon fontSize={`large`}/>
                </div>
            </Link>
            <LogOutBtn />
        </div>
    )
}

export default Navbar;