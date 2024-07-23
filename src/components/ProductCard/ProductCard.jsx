import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({product}) {
    
    console.log(product);

    const { _id, name, description, price} = product

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>{price}</Card.Text>
                <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    )
}

// Check if the CourseCard component is getting the correct prop types (data types of the properties)
// PropTypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to the next
CourseCard.propTypes = {
    // The "shape" method is used to check if a prop object conforms to a specific "shape"
    courseProp: PropTypes.shape({
        // Define the properties and their expected types
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}