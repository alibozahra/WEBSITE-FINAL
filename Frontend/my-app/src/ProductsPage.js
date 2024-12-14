import React, { useState } from 'react';
import './ProductsPage.css';

const products = [
  {
    name: 'PlayStation 5',
    price: '$499',
    description: 'Next-gen gaming console with ultra-fast load times, 4K support, and a new controller design.',
    image: 'https://osamasalama.com/wp-content/uploads/2023/02/Sony-PlayStation-5-Console.png',
  },
  {
    name: 'iPhone 15',
    price: '$999',
    description: 'The latest iPhone with 5G, improved camera system, and powerful A16 Bionic chip.',
    image: 'https://mac-center.com/cdn/shop/files/IMG-10942145_9f7ece93-39fc-4310-a98d-9c11efa3a51e.jpg?v=1723752783&width=823',
  },
  {
    name: 'MacBook Pro',
    price: '$1299',
    description: 'High-performance laptop with Apple M1 chip, Retina display, and all-day battery life.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/apple-m4-macbook-pro-lead-672b861685fd0.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*',
  },
  {
    name: 'Beats Headphones',
    price: '$299',
    description: 'Wireless noise-canceling headphones with deep bass and high-quality sound.',
    image: 'https://www.beatsbydre.com/content/dam/beats/web/product/headphones/studiopro-wireless/plp/plp-studiopro-navy.jpg.large.2x.jpg',
  },
];

const ProductsPage = ({ handleAddToCart, handleViewCart, handleReturnHome }) => {
  const [showMessage, setShowMessage] = useState(false); // State to control the "Product added" message visibility

  const addToCart = (product) => {
    handleAddToCart(product);
    setShowMessage(true); // Show the message when a product is added
    setTimeout(() => setShowMessage(false), 3000); // Hide the message after 3 seconds
  };

  return (
    <div className="products-container">
      <div className="return-home-container">
        <button className="return-home-btn" onClick={handleReturnHome}>Return to Home</button>
      </div>

      <h1 className="products-title">Our Products</h1>

      {/* Product Added Message */}
      {showMessage && <div className="product-added-message">Product has been added to your cart!</div>}

      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* View Cart Button */}
      <div className="view-cart-container">
        <button className="view-cart-btn" onClick={handleViewCart}>
          View Cart
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
