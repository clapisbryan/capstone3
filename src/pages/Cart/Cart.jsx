import React, { useEffect, useState } from 'react';
import Body from '../../components/Body/Body';
import CustomTable from './CustomTable/CustomTable';

const Cart = () => {
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch cart data from your API
		fetchCartData();
	}, []);

	const fetchCartData = async () => {

		const response = await fetch('http://localhost:4006/b6/cart/get-cart', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				// Include authorization token if needed
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});
		if (response.ok) {
			const cartData = await response.json();
			setCart(cartData);
			setLoading(false);
		} else {
			setLoading(false);
		}
	};
	return (
		<>
			<Body title={"Cart View"}>
				{loading && <p>Loading cart...</p>}
				{!loading && cart && <CustomTable cart={cart} fetchData={fetchCartData} />}
				{!loading && !cart && <p>Please try to login as user to view a cart items</p>}
			</Body>
		</>
	)
}

export default Cart
