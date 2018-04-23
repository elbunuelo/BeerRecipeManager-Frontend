const recipesReducer = (state = [] , action) => {
    const {type, payload} = action;
    let recipes = null;
    switch (type) {
        case 'RECIPES::LOAD':
            return {
                ...state,
                ...payload
            }
        case 'RECIPES::DELETE_START':
            return {
                ...state,
                deleting: true,
                deletingId: payload.id
            }
        case 'RECIPES::DELETE_FINISH':
            recipes = state.recipes.filter(recipe => recipe.id !== payload.id);
            return {
                ...state,
                recipes,
                deleting: false,
                deletingId: null
            }
        case 'RECIPES::SAVE_START':
            return {
                ...state,
                saving: true,
                lastSavedId: null
            }
        case 'RECIPES::SAVE_FINISH':
            const savedRecipe = payload.recipe
            recipes = state.recipes.filter(recipe => recipe.id !== savedRecipe.id)
            return {
                ...state,
                recipes: recipes.concat([savedRecipe]),
                lastSavedId: savedRecipe.id,
                saving: false
            }
        case 'RECIPES::MOUNT':
            return {
                ...state,
                recipe: state.recipes.filter(recipe => recipe.id === parseInt(payload.id, 10))[0]
            }


        case 'RECIPES::UNMOUNT':
            return {
                ...state,
                recipe: null
            }


        case 'LOGIN::SESSION_CLEANUP':
            return {
                ...state,
                recipe: null,
                recipes: []
            }
        default:
            return state;
    }
};

export default recipesReducer;
