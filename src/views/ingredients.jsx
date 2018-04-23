import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetIngredients } from '../actions/ingredients';
import List from '../components/ingredients/list';


class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.props.getIngredients();
    }

    render() {
        return (
            <div className="container">
                <h2>Ingredients</h2>
                <List ingredients={this.props.ingredients} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getIngredients: () => { dispatch(GetIngredients()) }
})

const mapStateToProps = (state) => ({
    ingredients: state.ingredients.ingredients
})

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients)
