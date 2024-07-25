import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

const ChangePassword = () => {
	const [modalShow, setModalShow] = useState(false);

	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');


	const handleOnProceed = (e) => {
		e.preventDefault();
	}

	return (
		<>
			<Button variant='primary' size='md' className='mx-1' onClick={() => setModalShow(true)}>Change Password</Button>
			<Modal
				show={modalShow}
				onHide={() => setModalShow(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Change Password
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>New Password</Form.Label>
							<Form.Control type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
					<Button variant="primary" onClick={handleOnProceed}>PROCEED</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ChangePassword
