import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles = {
    icon: {
        marginRight: 5
    }
}
export default(props) => {
    const ingredients = props.ingredients.map((ingredient) => {
        return <tr key={ingredient.id}>
            <td>{ingredient.name}</td>
            <td>{ingredient.ingredient_type}</td>
            <td></td>
        </tr>
    });

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>
                        <Link to="/ingredients/new">
                            <Button className="pull-right" bsStyle="success">
                                <Glyphicon glyph="plus" style={ styles.icon }/>
                                Create New
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                {ingredients}
            </tbody>
        </Table>
    )
}
