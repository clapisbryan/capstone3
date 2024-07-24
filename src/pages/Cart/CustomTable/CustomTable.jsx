import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import RemoveProduct from './RemoveProduct/RemoveProduct';
import ProceedToCheckout from './ProceedToCheckout/ProceedToCheckout';

const CustomTable = ({ cart, fetchData }) => {
	const [productDetails, setProductDetails] = useState({});
	const [quantities, setQuantities] = useState({});
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		console.log("cart.totalPrice", cart.totalPrice);
	}, [])
	useEffect(() => {
		fetchProductDetails();
	}, [cart]);


	const fetchProductDetails = async () => {
		const productDetailsMap = {};
		const initialQuantities = {};
		for (const item of cart.cartItems) {
			const productId = item.productId;
			try {
				const response = await fetch(`http://localhost:4006/b6/products/${productId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				if (response.ok) {
					const productData = await response.json();
					productDetailsMap[productId] = productData.product;
					initialQuantities[productId] = item.quantity;
				} else {
					productDetailsMap[productId] = null;
				}
			} catch (error) {
				productDetailsMap[productId] = null;
			}
		}
		setProductDetails(productDetailsMap);
		setQuantities(initialQuantities);
		calculateTotalPrice(initialQuantities);
	};

	const handleQuantityChange = (productId, newQuantity) => {
		const newQuantities = { ...quantities, [productId]: newQuantity };
		setQuantities(newQuantities);
		calculateTotalPrice(newQuantities);
	};

	const calculateTotalPrice = (quantities) => {
		let newTotalPrice = 0;
		cart.cartItems.forEach((item) => {
			const productId = item.productId;
			const product = productDetails[productId];
			if (product && quantities[productId]) {
				newTotalPrice += product.price * quantities[productId];
			}
		});
		setTotalPrice(newTotalPrice);
	};

	return (
		<>
			<Table striped bordered>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{!cart || !cart.cartItems || cart.cartItems.length === 0 ? (
						<tr>
							<td colSpan={5}>
								<p className='text-center m-0 py-4'>Nothing to display</p>
							</td>
						</tr>
					) : (
						cart.cartItems.map((item) => (
							<tr key={item.productId}>
								<td>{productDetails[item.productId] ? productDetails[item.productId].name : 'Loading...'}</td>
								<td>{productDetails[item.productId] ? productDetails[item.productId].description : 'Loading...'}</td>
								<td>
									<input
										type="number"
										min="1"
										value={quantities[item.productId] || ''}
										onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
									/>
								</td>
								<td>{productDetails[item.productId] ? productDetails[item.productId].price : 'Loading...'}</td>
								<td>
									<RemoveProduct productId={item.productId} fetchData={fetchData} />
								</td>
							</tr>
						))
					)}
					{cart.cartItems.length !== 0 &&
						< tr >
							<td colSpan={3} className="text-end fw-bold">
								Total Price:
							</td>
							<td>{totalPrice === 0 ? `${cart.totalPrice}` : totalPrice}</td>
						</tr>
					}
				</tbody>
			</Table >

			{cart.cartItems.length !== 0 &&
				<ProceedToCheckout />
			}
		</>
	);
};

export default CustomTable;
