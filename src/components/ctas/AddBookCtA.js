import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

import PropTypes from 'prop-types';

const AddBookCtA = () => {
    return (
        <Card centered>
        	<Card.Content textAlign="center">
        	<Card.Header>
        		Add New Book
        	</Card.Header>
        	<Link to="/books/new"><Icon name="plus circle" size="massive" /></Link>
        	</Card.Content>
        </Card>
    );
};


AddBookCtA.propTypes = {
    
};

export default AddBookCtA;
