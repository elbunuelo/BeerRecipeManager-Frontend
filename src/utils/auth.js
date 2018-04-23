import api from '../api';

export const login = (data) => {
   return api.post('/auth/sign_in', data);
}

export const logout = () => {
    return new Promise((resolve, reject) => {
        api.delete('/auth/sign_out')
            .then((response) => {
                api.clearSession()
                resolve(response)
            })
            .catch((error) => reject(error))
    });
}

export const validateToken = () => {
    const { expiry, ...session } = api.getSession();
    return api.get('/auth/validate_token', session);
}
