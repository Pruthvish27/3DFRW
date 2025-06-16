import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <button onClick={clearCart}>Clear Cart</button>
      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <img src={item.images[0]} alt={item.name} style={{ width: '50px', height: '50px' }} />
          <div className="quantity-controls">
            <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
            <input
              type="number"
              id={`quantity-${item._id}`}
              value={item.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(item._id, e.target.value)}
            />
          </div>
          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h2>Total: ${calculateTotal()}</h2>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;