import React from "react";
import "./ProductList.css"; // Ensure this file is imported

const ProductList = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.pid} className="product-card">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-image"
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
