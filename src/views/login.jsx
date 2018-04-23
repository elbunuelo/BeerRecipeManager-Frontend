import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Alert, Panel } from 'react-bootstrap';
import { Login as UserLogin } from '../actions/auth';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loginError: false,
        };

        this.styles = {
            formContainer: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            },
            form: {
                width: '100%',
                maxWidth: 330,
                padding: 15
            },
            email: {
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottom: 'none'
            },
            password: {
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                marginBottom: 10
            },
            button: {
                width: '100%',
                display: 'block'
            }
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidUpdate(previousProps) {
        const { auth } = this.props;
        const previousAuth = previousProps.auth;
        if (previousAuth.isLoading && !auth.isLoading && !auth.isSignedIn) {
            this.setState({
                loginError: true
            });
        }

        if (previousAuth.isLoading && !auth.isLoading && auth.isSignedIn) {
            this.props.history.push('/recipes');
        }
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    }

    onKeyUp(event) {
        if (event.key === 'Enter') {
            this.login()
        }
    }

    login() {
        const {email, password} = this.state;
        this.setState({
            loginError: false
        });

        this.props.login(email, password);
    }

    render() {
        let loginError = null;
        if (this.state.loginError) {
            loginError = <Alert bsStyle="danger">Invalid user name or password</Alert>
        }

        return (
            <div style={this.styles.formContainer}>
                <h2>Login</h2>
                { loginError }
                <form style={this.styles.form}>
                    <FormControl
                        id="email"
                        style={this.styles.email}
                        type="text"
                        value={this.state.email}
                        placeholder="Email Address"
                        onChange={this.handleChange}
                        onKeyUp={this.onKeyUp}
                    />

                    <FormControl
                        id="password"
                        style={this.styles.password}
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        onKeyUp={this.onKeyUp}
                    />
                    <Button bsStyle="primary" bsSize="large" style={this.styles.button} onClick={this.login}>Log In</Button>
                </form>
                <div>You can login using <strong>test@example.com</strong> and <strong>password</strong></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => { dispatch(UserLogin(email, password)) }
});

const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);
export default withRouter(LoginComponent);
