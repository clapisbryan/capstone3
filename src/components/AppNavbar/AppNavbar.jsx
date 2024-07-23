import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const AppNavbar = () => {
	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary bg-dark">
				<Container>
					<Navbar.Brand href="#home">Ecommerce</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
						<Nav className="">
							<Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
							<Nav.Link as={NavLink} to="/admin" exact="true">Admin</Nav.Link>
							<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default AppNavbar
