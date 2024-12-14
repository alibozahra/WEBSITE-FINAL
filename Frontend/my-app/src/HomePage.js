import React from 'react';
import './HomePage.css';

const HomePage = ({ handleBrowseProducts, handleBrowseServices, handleViewCart, handleReturnHome }) => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">ElectroFix</div>
        <ul className="nav-links">
          <li><button onClick={handleReturnHome}>Home</button></li>
          <li><button onClick={handleBrowseServices}>Services</button></li>
          <li><button onClick={handleBrowseProducts}>Products</button></li>
          <li><button onClick={handleViewCart}>Cart</button></li> {/* Cart button fixed */}
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to ElectroFix</h1>
        <p>Your trusted partner for electronics and repair services</p>
      </div>

      {/* Main Content */}
      <div className="button-container">
        {/* Browse Products Button */}
        <div className="button-item">
          <img
            src="https://via.placeholder.com/300x200?text=Browse+Products"
            alt="Browse Products"
            className="button-image"
          />
          <button className="button" onClick={handleBrowseProducts}>
            Browse Products
          </button>
        </div>

        {/* Browse Services Button */}
        <div className="button-item">
          <img
            src="https://via.placeholder.com/300x200?text=Browse+Services"
            alt="Browse Services"
            className="button-image"
          />
          <button className="button" onClick={handleBrowseServices}>
            Browse Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
