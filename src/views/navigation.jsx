import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './navigation/login';
import User from './navigation/user'
import { withRouter } from 'react-router-dom';
import { Logout } from '../actions/auth'

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.signOut();
    }

    componentDidUpdate(previousProps) {
        const { auth } = this.props;
        const previousAuth = previousProps.auth;

        if (previousAuth.isSignedIn && !auth.isSignedIn) {
            this.props.history.push('/login');
        }
    }

    render() {
        const { auth } = this.props
        let loginLogout = <Login />;
        if (auth.isSignedIn) {
            loginLogout = <User username={auth.email} logout={this.logout}/>;
        }

        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Beer recipe manager</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/ingredients">
                            <NavItem eventKey={2}>
                                Ingredients
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to="/recipes">
                            <NavItem eventKey={3}>
                                Recipes
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {loginLogout}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>);
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(Logout())
});

const NavigationBarComponent = connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
export default withRouter(NavigationBarComponent);
