import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

export default (props) => {
    return (
        <NavDropdown eventKey="4" title={props.username} id="nav-dropdown">
            <MenuItem eventKey="4.1" onClick={props.logout}>Log out</MenuItem>
        </NavDropdown>
    );
}
