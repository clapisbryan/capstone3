import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../../hooks/UserContext';

export default function ProductView(){

	const { productId } = useParams();
	const { user } = useContext(UserContext);
	// an object with methods to redirect the user
	const navigate = useNavigate();

	const [quantity, setQuantity] = useState(0);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");

	useEffect(() => {
		console.log(productId);

		fetch(`http://localhost:4006/b6/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setName(data.name);
			setPrice(data.price);
			setDescription(data.description);
		})

	}, [productId]);

	return(
		<>
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <Button variant="primary" block="true" onClick={}>Add To Cart</Button>
                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )

}

