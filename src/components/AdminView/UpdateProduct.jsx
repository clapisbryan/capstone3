import {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UpdateProduct({product, fetchData}){

	const [productId, setProductId] = useState('');

	// Forms State
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	// state for editCourse modals to open/close
	const [showEdit, setShowEdit] = useState(false);

	// function for opening the modal
	const openEdit = (productId) => {
		// to still get the actual data from the form
		fetch(`http://localhost:4006/b6/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			// populate all the input values with the course info that we fetched
			// console.log(data);
			setProductId(data.id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price)
		})
		// Then, open the modal
		setShowEdit(true);
	}

	// function for closing the modal
	const closeEdit = () => {
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	// function to update/edit the course
	const editCourse = (e, productId) => {
		e.preventDefault();
		fetch(`http://localhost:4006/b6/products/${productId}/update`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.message === "Product updated successfully"){

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product Successfully updated'
				})
				closeEdit();
				fetchData();
			}else{

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			} 
		})
	}

	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Update</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="courseName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={name}
                            	onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="courseDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={description}
                            	onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="coursePrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
	                            type="number" 
	                            required
	                            value={price}
                            	onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
		</>
	)
}