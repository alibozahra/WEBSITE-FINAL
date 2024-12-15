import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ cart, userInfo, handleConfirmOrder }) => {
  const [userData, setUserData] = useState({
    name: userInfo ? userInfo.name : '',
    address: userInfo ? userInfo.address : '',
    city: userInfo ? userInfo.city : '',
    paymentMethod: 'credit', // Default to 'credit' for now
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     // Calculate total price
     const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

     // Create the order info object
     const orderInfo = {
       userId: userInfo ? userInfo.id : null,
       name: userData.name,
       address: userData.address,
       city: userData.city,
       paymentMethod: userData.paymentMethod,
       totalPrice: totalPrice,
       products: cart, // Ensure that this is the correct format
     };
 
     // Call handleConfirmOrder function passed from App.js
     handleConfirmOrder(orderInfo); // Send order details to App.js for processing
   };

   return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={userData.paymentMethod}
            onChange={handleChange}
          >
            <option value="credit">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <button type="submit" className="confirm-order-btn">Confirm Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;