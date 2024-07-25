import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../../../../hooks/UserContext';

const ProceedToCheckout = ({ cartItems, totalPrice }) => {
  const { user } = useContext(UserContext);

  const createOrder = async () => {
    try {
      const response = await fetch('http://localhost:4006/b6/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId: user.id, 
          productsOrdered: cartItems,
          totalPrice: totalPrice
        })
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Order Created Successfully!',
          text: `Order ID: ${data.orderId}`
        });
        navigate("/orders");
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed to Create Order',
          text: errorData.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create order. Please try again later.'
      });
    }
  };

  return (
    <>
    <div className="text-end">
    <Button variant="dark" onClick={createOrder}>Proceed to Checkout</Button>
    </div>
    </>
    );
};

export default ProceedToCheckout;
