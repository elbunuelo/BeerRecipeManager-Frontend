const ingredientsReducer = (state = [], action) => {
    const {type, payload} = action;
    switch(type) {
        case 'INGREDIENTS::LOAD':
            return {
                ...state,
                ...payload
            }
        case 'INGREDIENTS::CREATE_FINISH':
            const ingredients = state.ingredients;
            return {
                ...state,
                ingredients: ingredients.concat([payload.ingredient]),
                creating: false
            }
        case 'INGREDIENTS::CREATE_START':
            return {
                ...state,
                creating: true
            }
        default:
            return state;
    }
};

export default ingredientsReducer;
