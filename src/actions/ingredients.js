import api from '../api';

export const GetIngredients = () => {
    return (dispatch) => {
        api.get('/ingredients')
            .then((response) => {
                dispatch(LoadIngredients(response.data));
            })
            .catch((error) => console.log(error));
    }
}

export const LoadIngredients = (ingredients) => ({
    type: 'INGREDIENTS::LOAD',
    payload: {
        ingredients
    }
})

export  const CreateIngredient = (data) =>  {
    return (dispatch) => {
        dispatch(StartIngredientCreate())
        api.post('/ingredients', data)
            .then((response) => {
                dispatch(FinishIngredientCreate(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export const StartIngredientCreate = () => ({
    type: 'INGREDIENTS::CREATE_START'
})

export const FinishIngredientCreate = (data) => ({
    type: 'INGREDIENTS::CREATE_FINISH',
    payload: {
        ingredient: data
    }
})
