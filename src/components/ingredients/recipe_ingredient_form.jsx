import React, { Component } from 'react';
import { FormControl, ControlLabel, Button } from 'react-bootstrap';

class RecipeIngredientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'ingredient_id': "",
            amount: '',
            unit: 'lbs',
        };

        this.addIngredient = this.addIngredient.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
        this.styles = {
            amountContainer: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10
            }
        };
    }

    clear() {
        this.setState({
            'ingredient_id': "",
            amount: '',
            unit: 'lbs'
        });
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    }

    addIngredient() {
        if (!this.state.ingredient_id || !this.state.amount) {
            return;
        }

        this.props.addIngredient(this.state);
        this.clear();
    }

    render() {
        if (!this.props.ingredients) {
            return <div> Loading </div>;
        }

        const ingredients = this.props.ingredients.map(ingredient => {
            return (
                <option key={ingredient.id} value={ingredient.id}>{ingredient.name} - ({ingredient.ingredient_type})</option>
            )
        });

        return (
            <div>
                <h3>Pick Recipe Ingredients</h3>
                <FormControl id="ingredient_id" componentClass="select" placeholder="Select" onChange={this.handleChange} value={this.state.ingredient_id}>
                    <option value="">Select</option>
                    {ingredients}
                </FormControl>
                <ControlLabel htmlFor="amount">Amount</ControlLabel>
                <div style={this.styles.amountContainer}>
                    <FormControl id="amount" type="text" onChange={this.handleChange} value={this.state.amount}/>
                    <FormControl id="unit" componentClass="select" onChange={this.handleChange} value={this.state.unit}>
                        <option value="lbs">lbs</option>
                        <option value="oz">oz</option>
                    </FormControl>
                </div>
                <div>
                    <Button bsStyle="success" onClick={this.addIngredient}>Add</Button>
                </div>
            </div>
        );
    }
}

export default RecipeIngredientForm;
