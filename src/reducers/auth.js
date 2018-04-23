const AuthReducer = (state = [], action) => {
    const {type, payload} = action;

    switch (type) {
        case 'LOGIN::START':
            return {
                ...state,
                currentUser: {
                    isLoading: true,
                    isSignedIn: false
                }
            }
        case 'LOGIN::SUCCESS':
            return {
                ...state,
                currentUser: {
                    isLoading: false,
                    isSignedIn: true,
                    ...payload
                }
            }
        case 'LOGIN::ERROR':
            return {
                ...state,
                currentUser: {
                    isLoading: false,
                    isSignedIn: false
                }
            }

        case 'LOGIN::SESSION_CLEANUP':
            return {
                ...state,
                currentUser: {
                    isLoading: false,
                    isSignedIn: false
                }
            }
        default:
            return state
    }
};

export default AuthReducer;
