const initialState = {
    auth: {
        currentUser: {
            isLoading: false,
            isSignedIn: false,
        },
    },
    recipes: {
        recipes: [],
        deleting: false,
        deletingId: null,
        saving: false,
        lastSavedId: null,
        recipe: null
    },
    ingredients: {
        ingredients: [],
        creating: false
    }

};

export default initialState;
