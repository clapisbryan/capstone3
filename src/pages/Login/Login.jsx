import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import UserContext from '../../hooks/UserContext';

const Login = () => {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [isActive, setIsActive] = useState(true);

	const handleLogin = (e) => {
		e.preventDefault();

		fetch(`http://localhost:4006/b6/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(res => res.json())
			.then(data => {
				console.log("Login Data", data);
				if (data.access !== undefined) {

					console.log(data.access);
					localStorage.setItem('token', data.access);
					retrieveUserDetails(data.access);
					setEmail('');
					setPassword('');

					Swal.fire({
						title: "Login Successful",
						icon: "success",
						text: "You are now logged in."
					})

				} else if (data.message == "Incorrect email or password") {

					Swal.fire({
						title: "Login Failed",
						icon: "error",
						text: "Incorrect email or password."
					})

				} else {

					Swal.fire({
						title: "User Not Found",
						icon: "error",
						text: `${email} does not exist.`
					})

				}
			})
	}

	function retrieveUserDetails(token) {
		fetch('http://localhost:4006/b6/users/details', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setUser({
					id: data._id,
					isAdmin: data.isAdmin
				});
			})
	}

	useEffect(() => {
		if (email !== '' && password !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}

	}, [email, password]);

	return (
		<>
			<Row className='align-items-center justify-content-center vh-100'>
				<Col sm={12} md={5}>
					<Card>
						<CardBody>
							<Form onSubmit={handleLogin}>
								<div className="mb-3">
									<h1 className='text-center'>LOGIN</h1>
								</div>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</Form.Group>
								<div className="text-center">
									{
										isActive ? <Button variant="primary" type="submit" size='md'>
											Login
										</Button> :
											<Button variant="secondary" type="submit" size='md' disabled>
												Login
											</Button>
									}

								</div>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Login
