import React from 'react';
import './CartPage.css';

const CartPage = ({ cart, handleRemoveFromCart, handleReturnHome, handleReturnProducts, handleProceedToCheckout }) => {
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

  return (
    <div className="cart-container">
      <div className="return-home-container">
        <button className="return-home-btn" onClick={handleReturnHome}>Return to Home</button>
        <button className="return-products-btn" onClick={handleReturnProducts}>Return to Products</button>
      </div>

      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">{item.price}</p>
                <button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="total-price">
        <h2>Total Price: ${totalPrice}</h2>
      </div>

      {cart.length > 0 && (
        <button className="checkout-btn" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
