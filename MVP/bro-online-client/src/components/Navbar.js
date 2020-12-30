import React from 'react';
import LogOutBtn from "./LogOutBtn";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <Link to="/">Home</Link>
            <LogOutBtn />
        </div>
    )
}

export default Navbar;