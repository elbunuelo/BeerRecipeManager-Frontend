import React, { Component } from 'react';
import { GetRecipes, DeleteRecipe } from '../actions/recipes';
import { connect } from 'react-redux';
import List from '../components/recipes/list';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.props.getRecipes();
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(id) {
        this.props.deleteRecipe(id);
    }

    render() {
        return (
            <div className="container">
                <h2>Recipes</h2>
                <List recipes={this.props.recipes}
                    onDelete={this.onDelete}
                    deleting={this.props.deleting}
                    deletingId={this.props.deletingId}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecipes: () => { dispatch(GetRecipes()) },
    deleteRecipe: (id) => { dispatch(DeleteRecipe(id)) }
})

const mapStateToProps = (state) => ({
    recipes: state.recipes.recipes,
    deleting: state.recipes.deleting,
    deletingId: state.recipes.deletingId
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
