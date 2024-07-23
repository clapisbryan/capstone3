import { useEffect, useState, useContext } from 'react';
import ProductCard from '../../components/ProductCard';
import UserContext from '../../hooks/UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Products() {

    const { user } = useContext(UserContext); 
    const [products, setProducts] = useState([]);


    useEffect(() => {

        fetch('http://localhost:4006/b6/products/active', {
         headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
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


    return(
        <>
            {
            user
            ?
                products.length > 0
                ?
                <>  
                    <h1 className='text-center mt-5'>Our Products</h1>
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
                </>
                :
                <>
                    <h1>No Products</h1>
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