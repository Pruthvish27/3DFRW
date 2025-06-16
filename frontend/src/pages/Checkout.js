import React from 'react';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems, clearCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    alert('Checkout Completed! (No actual payment processing implemented)');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Your cart is empty. Nothing to checkout.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Order Summary:</h2>
      {cartItems.map((item) => (
        <div key={item._id} className="checkout-item">
          <p>{item.name} ({item.quantity}) - ${item.price * item.quantity}</p>
        </div>
      ))}
      <h2>Total: ${calculateTotal()}</h2>
      <button onClick={handleCheckout}>Complete Checkout</button>
    </div>
  );
}

export default Checkout;