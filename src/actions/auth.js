import { login, logout, validateToken } from '../utils/auth';

export const Login = (email, password) => {
    return (dispatch) => {
        dispatch(LoginStart())
        login({email, password})
            .then((response) => dispatch(LoginSuccess(response.data.data)))
            .catch((error) => dispatch(LoginError(error)));
    };
};

export const LoginStart = () => ({
    type: 'LOGIN::START'
});

export const LoginSuccess = (data) => ({
    type: 'LOGIN::SUCCESS',
    payload: data
});

export const LoginError = (error) => ({
    type: 'LOGIN::ERROR',
    payload: error
})

export const Logout = () => {
    return (dispatch) => {
        dispatch(SessionCleanup())
        logout()
            .then((response) => console.log('Success'))
            .catch((error) => console.log(error))
    }
}


export const SessionCleanup = () => ({
    type: 'LOGIN::SESSION_CLEANUP'
})

export const ValidateToken = () => {
    return (dispatch) => {
        validateToken()
            .then((response) => dispatch(LoginSuccess(response.data.data)))
            .catch((error) => dispatch(LoginError(error)));
    }
}
