import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateIngredient } from '../actions/ingredients';
import { FormControl, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class IngredientForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            'ingredient_type': null,
            'name': ''
        };

        this.styles ={
            submit: {
                marginTop: 10
            }
        }
    }

    componentDidUpdate(previousProps) {
        if (previousProps.creating === true && this.props.creating === false) {
            this.props.history.push('/ingredients')
        }
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    }

    onSubmit() {
        this.props.createIngredient(this.state);
    }

    render() {
        return(
            <div className="container">
                <h2>Create new ingredient</h2>
                <form>
                    <ControlLabel htmlFor="name">Ingredient Name</ControlLabel>
                    <FormControl id="name" type="text" onChange={this.handleChange} value={this.state.name} />

                    <ControlLabel htmlFor="ingredient_type">Ingredient Type</ControlLabel>
                    <FormControl id="ingredient_type" componentClass="select" placeholder="Select" onChange={this.handleChange}>
                        <option value={null}>Select</option>
                        <option value="grains">Grains</option>
                        <option value="hops">Hops</option>
                        <option value="adjuncts">Adjuncts</option>
                    </FormControl>
                    <Button style={this.styles.submit} bsStyle="primary" className="pull-right" onClick={this.onSubmit}>Save</Button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state) =>  ({
    creating: state.ingredients.creating
});

const mapDispatchToProps = (dispatch) => ({
    createIngredient: (data) => { dispatch(CreateIngredient(data)) }
});

const IngredientFormComponent = connect(mapStateToProps, mapDispatchToProps)(IngredientForm);
export default withRouter(IngredientFormComponent);
