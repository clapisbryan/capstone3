import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const OrderHistoryAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:4006/b6/orders/all-orders', {
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
      <h2>All Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Email</th>
            <th>Product Name(s)</th>
            <th>Total Price</th>
            <th>Quantity</th          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No orders found</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId.email}</td>
                <td>
                  {order.productsOrdered.map((product) => (
                    <div key={product._id}>
                      <p>{product.name}</p>
                      <p>{product.description}</p>
                    </div>
                  ))}
                </td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.productsOrdered.map((product) => (
                    <p key={product._id}>{product.quantity}</p>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderHistoryAdmin;
