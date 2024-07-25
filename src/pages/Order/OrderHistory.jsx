import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Body from '../../components/Body/Body';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch('http://localhost:4006/b6/orders/my-orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch orders. Please try again later.'
      });
    }
  };

  return (
    <div>
      <Body title={"Order History"}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.productsOrdered.map(product => product.name).join(', ')}</td>
                  <td>{order.productsOrdered.map(product => product.description).join(', ')}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Body>
    </div>
  );
};

export default OrderHistory;
