import React from 'react';
import './ProductsPage.css';

const products = [
  {
    name: 'PlayStation 5',
    price: '$499',
    description: 'Next-gen gaming console with ultra-fast load times, 4K support, and a new controller design.',
    image: 'https://via.placeholder.com/300x200?text=PlayStation+5',
  },
  {
    name: 'iPhone 15',
    price: '$999',
    description: 'The latest iPhone with 5G, improved camera system, and powerful A16 Bionic chip.',
    image: 'https://via.placeholder.com/300x200?text=iPhone+15',
  },
  {
    name: 'MacBook Pro',
    price: '$1299',
    description: 'High-performance laptop with Apple M1 chip, Retina display, and all-day battery life.',
    image: 'https://via.placeholder.com/300x200?text=MacBook+Pro',
  },
  {
    name: 'Beats Headphones',
    price: '$299',
    description: 'Wireless noise-canceling headphones with deep bass and high-quality sound.',
    image: 'https://via.placeholder.com/300x200?text=Beats+Headphones',
  },
];

const ProductsPage = ({ handleAddToCart, handleReturnHome, handleViewCart }) => {
  return (
    <div className="products-container">
      <div className="return-home-container">
        {/* Return to Home Button */}
        <button className="return-home-btn" onClick={handleReturnHome}>Return to Home</button>
      </div>

      <h1 className="products-title">Our Products</h1>

      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
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
