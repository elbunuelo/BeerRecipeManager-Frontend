import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles = {
    actionsContainer: {
        textAlign: 'right'
    },
    icon: {
        marginRight: 5
    },
    editButton: {
        marginRight: 10
    }
};

export default (props) => {
    const recipes = props.recipes.map((recipe) => {
        let item = (
            <tr key={recipe.id}>
                <td>
                    <Link to={"/recipes/" + recipe.id}>{recipe.name}</Link>
                </td>
                <td style={styles.actionsContainer}>
                    <Link to={"/recipes/" + recipe.id + "/edit"} style={styles.editButton }>
                        <Button className="" bsStyle="warning">
                            <Glyphicon glyph="pencil" style={ styles.icon }/>
                            Edit
                        </Button>
                    </Link>
                    <Button bsStyle="danger" onClick={() => props.onDelete(recipe.id)}>
                        <Glyphicon glyph="remove" style={ styles.icon }/>
                        Delete
                    </Button>
                </td>
            </tr>
        );

        if (props.deleting && props.deletingId === recipe.id) {
            item = <tr key="deleting-0"><td key={recipe.id} colSpan="3">Deleting...</td></tr>
        }

        return item;
    });

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>
                        <Link to="/recipes/new">
                            <Button className="pull-right" bsStyle="success">
                                <Glyphicon glyph="plus" style={ styles.icon }/>
                                Create New
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                {recipes}
            </tbody>
        </Table>
    )
};
