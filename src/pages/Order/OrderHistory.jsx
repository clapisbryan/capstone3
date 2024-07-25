import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

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
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed to Fetch Orders',
          text: errorData.message || 'Something went wrong. Please try again later.'
        });
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
      <h2>Order History</h2>
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
    </div>
  );
};

export default OrderHistory;
