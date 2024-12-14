import React, { useState } from 'react';
import './App.css';
import LoginPage from './LoginPage'; // Import the LoginPage component
import SignUpPage from './SignUpPage'; // Import the SignUpPage component
import HomePage from './HomePage'; // Import the HomePage component
import ProductsPage from './ProductsPage'; // Import the ProductsPage component
import ServicesPage from './ServicesPage'; // Import the ServicesPage component
import CartPage from './CartPage'; // Import the CartPage component
import CheckoutPage from './CheckoutPage'; // Import the CheckoutPage component

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Tracks the current page
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const [cart, setCart] = useState([]); // Cart state to store added products
  const [userInfo, setUserInfo] = useState(null); // User info for checkout

  const handlePageChange = (page) => {
    setCurrentPage(page); // Switch between 'login', 'signup', 'home', and 'cart'
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
    setCurrentPage('home'); // Navigate to HomePage after login
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]); // Add the selected product to the cart
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Remove item at the index
    setCart(updatedCart);
  };

  const handleReturnHome = () => {
    setCurrentPage('home'); // Navigate back to HomePage
  };

  const handleReturnProducts = () => {
    setCurrentPage('products'); // Navigate back to ProductsPage
  };

  const handleViewCart = () => {
    setCurrentPage('cart'); // Navigate to CartPage
  };

  const handleBrowseServices = () => {
    setCurrentPage('services'); // Navigate to ServicesPage
  };

  const handleBrowseProducts = () => {
    setCurrentPage('products'); // Navigate to ProductsPage
  };

  // This function will handle the Proceed to Checkout functionality
  const handleProceedToCheckout = () => {
    setCurrentPage('checkout'); // Navigate to CheckoutPage
  };

  // This function will handle confirming the order
  const handleConfirmOrder = (orderInfo) => {
    // Send the order data to the backend to store it in the database
    fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderInfo),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Order placed successfully') {
          alert('Your order has been placed successfully!');
          setCurrentPage('checkout'); // Navigate to checkout page or confirmation page
        } else {
          alert('Error placing the order. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error placing order:', error);
        alert('Error placing the order. Please try again.');
      });
  };

  const handleRequestRepair = (service) => {
    alert(`You have requested a repair for: ${service}`); // Simple alert for now when a repair is requested
  };

  return (
    <div className="App">
      {/* Conditional rendering based on currentPage */}
      {currentPage === 'login' && !isLoggedIn && (
        <LoginPage handlePageChange={handlePageChange} handleLogin={handleLogin} />
      )}

      {currentPage === 'signup' && (
        <SignUpPage handlePageChange={handlePageChange} />
      )}

      {currentPage === 'home' && isLoggedIn && (
        <HomePage
          handleBrowseProducts={handleBrowseProducts} // Pass handleBrowseProducts to HomePage
          handleBrowseServices={handleBrowseServices} // Pass handleBrowseServices to HomePage
          handleReturnHome={handleReturnHome} // Pass handleReturnHome to HomePage
          handleViewCart={handleViewCart} // Pass handleViewCart to HomePage
        />
      )}

      {currentPage === 'products' && (
        <ProductsPage 
          handleAddToCart={handleAddToCart} 
          handleViewCart={handleViewCart} // Pass handleViewCart to ProductsPage
          handleReturnHome={handleReturnHome} // Pass handleReturnHome to ProductsPage
        />
      )}

      {currentPage === 'services' && (
        <ServicesPage 
          handleRequestRepair={handleRequestRepair} // Pass handleRequestRepair to ServicesPage
          handleReturnHome={handleReturnHome} // Return to HomePage
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleReturnHome={handleReturnHome}
          handleReturnProducts={handleReturnProducts}
          handleProceedToCheckout={handleProceedToCheckout} // Pass handleProceedToCheckout to CartPage
        />
      )}

      {currentPage === 'checkout' && <CheckoutPage cart={cart} userInfo={userInfo} handleConfirmOrder={handleConfirmOrder} />}
    </div>
  );
}

export default App;
