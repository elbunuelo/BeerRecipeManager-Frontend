import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';
import recipesReducer from './recipes';
import ingredientsReducer from './ingredients';
import authReducer from './auth';

const beerRecipeManager = combineReducers({
    reduxTokenAuth: reduxTokenAuthReducer,
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
    auth: authReducer
});

export default beerRecipeManager;
