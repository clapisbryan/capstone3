import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Body from '../../components/Body/Body';
import ProductCard from '../../components/ProductCard';
import UserContext from '../../hooks/UserContext';

export default function Products() {

	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([]);


	useEffect(() => {

		fetch('http://localhost:4006/b6/products/active', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(data => {

				if (typeof data.message !== "string") {
					setProducts(data.products);
				} else {
					setProducts([]);
				}

			});

	}, []);


	return (
		<>
			{
				user
					?
					<>
						<Body title={"Our Products"}>
							{
								products.length > 0 ?
									<Row>
										{
											products.map(product => {
												return (
													<Col md={3} key={product._id}>
														<ProductCard product={product} />
													</Col>
												)
											})
										}
									</Row>
									:
									<>
										<h1>No Products</h1>
									</>
							}
						</Body>
					</>
					:
					<>
						<h1>You are not logged in</h1>
						<Link className="btn btn-primary" to={"/login"}>Login to View</Link>
					</>
			}
		</>
	)
}