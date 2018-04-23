import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MountRecipe }  from '../actions/recipes';
import { GetIngredients } from '../actions/ingredients';
import RecipeIngredients from '../components/ingredients/recipe_ingredients';


class RecipeDetail extends Component {
    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.props.getIngredients();
        this.props.mountRecipe(id);
    }

    render() {
        const { recipe, ingredients } = this.props;
        if (!recipe || ingredients.length === 0) {
            return (
                <div className="container">
                    <h1>Loading...</h1>
                </div>
            );
        }

        return (
            <div className="container">
                <h1>{recipe.name}</h1>
                <div>
                    <strong>Mash time:</strong>
                    <span>{recipe.mash_time}</span>
                </div>
                <div>
                    <strong>Mash temperature:</strong>
                    <span>{recipe.mash_temperature}</span>
                </div>
                <div>
                    <strong>Boil time:</strong>
                    <span>{recipe.boil_time}</span>
                </div>
                <div>
                    <strong>Notes:</strong>
                    <div>{recipe.notes}</div>
                </div>
                <RecipeIngredients ingredients={ingredients} recipeIngredients={recipe.recipe_ingredients}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipes.recipe,
    ingredients: state.ingredients.ingredients
})

const mapDispatchToProps = (dispatch) => ({
    getIngredients: () => { dispatch(GetIngredients()) },
    mountRecipe: (id) => { dispatch(MountRecipe(id)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
