import React from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => {
    return (
    <LinkContainer to="/login">
        <NavItem>
            Log in
        </NavItem>
    </LinkContainer>
    );
};
