import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormControl, ControlLabel, Button }  from 'react-bootstrap';
import RecipeIngredientForm from '../components/ingredients/recipe_ingredient_form';
import RecipeIngredients from '../components/ingredients/recipe_ingredients';
import { GetIngredients } from '../actions/ingredients';
import { SaveRecipe, MountRecipe, UnmountRecipe } from '../actions/recipes';

class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            'mash_time': '',
            'mash_temperature': '',
            'boil_time': '',
            notes: '',
            'recipe_ingredients': []
        }


        this.handleChange = this.handleChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.onSave = this.onSave.bind(this);
        this.props.getIngredients();

        const { match: { params: { id } } } = props
        this.props.unmountRecipe();
        if (id) {
            this.props.mountRecipe(id);
        }
    }

    componentWillUnmount() {
        this.props.unmountRecipe();
    }

    componentDidUpdate(previousProps) {
        if (previousProps.saving === true && this.props.saving === false) {
            this.props.history.push('/recipes');
        }

        if (!previousProps.recipe && this.props.recipe) {
            this.setState({
                ...this.props.recipe
            })
        }
    }

    onSave() {
        const { match: { params: { id } } } = this.props
        const { recipe_ingredients, ...other } = this.state

        let data = {...other}
        if (id) {
            data = {
                ...data,
                id
            }
        } else {
            data = {
                ...data,
                'recipe_ingredients_attributes': recipe_ingredients
            }
        }
        this.props.saveRecipe(data);
    }

    addIngredient(ingredient) {
        this.setState({
            'recipe_ingredients': this.state.recipe_ingredients.concat([ingredient])
        })
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    }

    render() {
        const { ingredients } = this.props
        if (ingredients.length === 0) {
            return(<h2>Loading...</h2>)
        }
        return (
            <div className="container">
                <h2>Create new recipe</h2>
                <form>
                    <ControlLabel htmlFor="name">Name</ControlLabel>
                    <FormControl id="name" type="text" onChange={this.handleChange} value={this.state.name} />
                    <ControlLabel>Mash Time</ControlLabel>
                    <FormControl id="mash_time" type="text" onChange={this.handleChange} value={this.state.mash_time} />
                    <ControlLabel>Mash Temperature</ControlLabel>
                    <FormControl id="mash_temperature" type="text" onChange={this.handleChange} value={this.state.mash_temperature}/>
                    <ControlLabel>Boil Time</ControlLabel>
                    <FormControl id="boil_time" type="text" onChange={this.handleChange} value={this.state.boil_time}/>
                    <ControlLabel>Notes</ControlLabel>
                    <FormControl id="notes" componentClass="textarea" onChange={this.handleChange} value={this.state.notes}/>
                    <RecipeIngredientForm ingredients={this.props.ingredients} addIngredient={this.addIngredient}/>
                    <RecipeIngredients ingredients={ingredients} recipeIngredients={this.state.recipe_ingredients} />
                    <Button className="pull-right" bsStyle="primary" onClick={this.onSave}>Save</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients.ingredients,
    saving: state.recipes.saving,
    lastSavedId: state.recipes.lastSavedId,
    recipe: state.recipes.recipe
});

const mapDispatchToProps =  (dispatch) => ({
    getIngredients: () => { dispatch(GetIngredients()) },
    saveRecipe: (data) => { dispatch(SaveRecipe(data)) },
    mountRecipe: (id) => { dispatch(MountRecipe(id)) },
    unmountRecipe: () => { dispatch(UnmountRecipe()) }
});

const RecipeFormComponent = connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
export default withRouter(RecipeFormComponent);
