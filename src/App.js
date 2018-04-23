import React, { Component } from 'react';
import { connect }  from 'react-redux';
import Login from './views/login';
import Recipes from './views/recipes';
import RecipeForm from './views/recipe_form';
import RecipeDetail from './views/recipe_detail';
import Ingredients from './views/ingredients';
import IngredientForm from './views/ingredient_form';
import Navigation from './views/navigation';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ValidateToken } from './actions/auth';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.validateToken();
        this.requireLogin = this.requireLogin.bind(this);
    }

    requireLogin(component) {
        const { auth } = this.props;
        if (!auth.isSignedIn) {
            return Login
        }

        return component;
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/recipes/new" component={this.requireLogin(RecipeForm)} />
                        <Route path="/recipes/:id/edit" component={this.requireLogin(RecipeForm)} />
                        <Route path="/recipes/:id" component={this.requireLogin(RecipeDetail)} />
                        <Route path="/recipes" component={this.requireLogin(Recipes)} />
                        <Route path="/ingredients/new" component={this.requireLogin(IngredientForm)} />
                        <Route path="/ingredients" component={this.requireLogin(Ingredients)} />
                        <Route path="/" component={this.requireLogin(Recipes)} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    validateToken: () => dispatch(ValidateToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
