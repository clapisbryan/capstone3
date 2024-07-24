import React, { useEffect, useState } from 'react'
import Body from '../../components/Body/Body'
import Action from './Actions/Action'
import ProductCard from '../../components/ProductCard/ProductCard';
import { Col, Row } from 'react-bootstrap';

const AdminDashboard = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    retrieveProducts();
  }, [])

  const retrieveProducts = () => {
    fetch('http://localhost:4006/b6/products/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("retrieveProducts", data.products);
        if (data.products) {
          setResult(data.products)
        } else {
          setResult([])
        }
      })
  }
  return (
    <>
      <Body title={"Admin Dashboard"}>
        <Action fetchData={retrieveProducts} />
        <Row className='mt-5'>
          {result.map((product) => {
            return (
              <Col sm={12} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Col>
            )
          })}
        </Row>
      </Body>
    </>
  )
}

export default AdminDashboard
