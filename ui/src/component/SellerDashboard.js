import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./SellerDashboard.css";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const sellerId = localStorage.getItem("sellerId")?.trim();

  useEffect(() => {
    if (!sellerId) {
      alert("You must be logged in as a seller!");
      navigate("/login-seller");
      return;
    }

    axios.get(`http://localhost:8080/api/products/seller/${sellerId}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, sellerId]);

  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts(prevProducts => [location.state.newProduct, ...prevProducts]);
    }
  }, [location.state]);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div className="dashboard-container">
      <h2>Seller Dashboard</h2>
      <button className="add-product-btn" onClick={handleAddProduct}>Add New Product</button>

      <h3>Your Products</h3>

      {loading ? <p className="loading-text">Loading products...</p> : null}
      {products.length === 0 && !loading ? <p className="no-products">No products found. Add some!</p> : null}

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.pid}>
            {product.image ? (
              <img 
                src={`http://localhost:8080/api/products/images/${product.image}`}  
                alt={product.name} 
                className="product-image"
              />
            ) : (
              <p className="no-image">No Image</p>
            )}
            <p className="product-name">{product.name}</p>
            <p className="product-price">₹{product.price}</p>
            <p className="product-category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
