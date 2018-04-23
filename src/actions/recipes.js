import api from '../api';

export const GetRecipes = (callback) => {
    return (dispatch) => {
        api.get('/recipes')
            .then((response) => {
                dispatch(LoadRecipes(response.data));
                if (callback) {
                    callback()
                }
            })
            .catch((error) => console.log(error));
    }
}

export const LoadRecipes = (recipes) => ({
    type: 'RECIPES::LOAD',
    payload: {
        recipes
    }
})

export const DeleteRecipe = (id) => {
    return (dispatch) => {
        dispatch(StartRecipeDelete(id))
        api.delete('/recipes/' + id)
            .then((response) => {
                dispatch(FinishRecipeDelete(id))
            })
            .catch((error) => console.log(error));
    }
};

export const StartRecipeDelete = (id) => ({
    type: 'RECIPES::DELETE_START',
    payload: {
        id
    }
});

export const FinishRecipeDelete = (id) => ({
    type: 'RECIPES::DELETE_FINISH',
    payload: {
        id
    }
});


export const SaveRecipe = (data) => {
    const hasId = !!data.id;

    let url = '/recipes';
    let method = 'post';
    if (hasId) {
        url += '/' + data.id;
        method = 'put';
    }

    return (dispatch) => {
        dispatch(StartRecipeSave())
        api[method](url, data)
            .then((response) => {
                dispatch(FinishRecipeSave(response.data))
            })
            .catch((error) => console.log(error));
    }
};

export const StartRecipeSave = () => ({
    type: 'RECIPES::SAVE_START'
});

export const FinishRecipeSave = (recipe) => ({
    type: 'RECIPES::SAVE_FINISH',
    payload: {
        recipe
    }
});

export const MountRecipe = (id) => {
    return (dispatch, getState) => {
        const {recipes: {recipes}} = getState();
        if (recipes.length === 0) {
            dispatch(
                GetRecipes(() => dispatch(DispatchMount(id)))
            )
        } else {
            dispatch(DispatchMount(id))
        }
    }
};

export const DispatchMount = (id) => ({
    type: 'RECIPES::MOUNT',
    payload: {
        id
    }
});

export const UnmountRecipe = () => ({
    type: 'RECIPES::UNMOUNT'
});
