import React, { useEffect, useState } from 'react'
import Body from '../../components/Body/Body'
import { Button, Col, Form, Row } from 'react-bootstrap'
import ChangePassword from './ChangePassword/ChangePassword';

const Profile = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		// Get user details here
		
	}, [])

	const handleEdit = (e) => {
		e.preventDefault()
		setIsActive(false);
	}
	const handleUpdateProfile = () => {
		setIsActive(true);
	}


	return (
		<>
			<Body title={"Profile"}>
				<div className="d-flex align-items-center justify-content-end" >
					{isActive ?
						<Button variant='primary' size='md' className='mx-1' onClick={handleEdit}>Edit</Button> :
						<Button variant='primary' size='md' className='mx-1' onClick={handleUpdateProfile}>Save</Button>
					}
				</div>
				<Form>
					<Row>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>First Name</Form.Label>
								<Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Last Name</Form.Label>
								<Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Email Address</Form.Label>
								<Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Mobile Number</Form.Label>
								<Form.Control type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4} className='d-flex align-items-end'>
							<div className="mb-3">
								<ChangePassword />
							</div>
						</Col>
					</Row>
				</Form>
			</Body>
		</>
	)
}

export default Profile
