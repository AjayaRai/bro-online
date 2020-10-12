import React from 'react';
import './SidebarRow.css';
import {Avatar} from "@material-ui/core";

function SidebarRow({src, Icon, title}) {
    return (
        <div className='sidebarRow'>
            {/*not sure how this is working; apparently its a condition*/}
            {src && <Avatar src={src} />}
            {Icon && <Icon />}

            <h4>{title}</h4>
        </div>
    );
}

export default SidebarRow;