import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoMatch = () => {
	return (
		<div>
			<Row>
				<Col className="mt-5 pt-5 text-center mx-auto">
					<h1>404 Error</h1>
					<p>Page Not Found</p>
					<Link className="btn btn-primary" to={"/"}>Return to Home</Link>
				</Col>
			</Row>
		</div>
	)
}

export default NoMatch
