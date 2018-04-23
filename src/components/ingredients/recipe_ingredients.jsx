import React from 'react';

const RecipeIngredients = (props) => {
    const { ingredients, recipeIngredients } = props;
    const ingredientComponents = recipeIngredients.map((recipeIngredient, index) => {
        let ingredientModel = ingredients.filter(i => i.id === parseInt(recipeIngredient.ingredient_id, 10))[0];
        return <li key={index}>{ingredientModel.name} - {recipeIngredient.amount} {recipeIngredient.unit}</li>;
    });

    return (
        <div>
            <h2>Ingredients</h2>
            <ul>
                {ingredientComponents}
            </ul>
        </div>
    );
}
export default RecipeIngredients;
