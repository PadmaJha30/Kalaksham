import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SellerLogin.css"; // Import the CSS file

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/seller/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        localStorage.setItem("sellerId", response.data.sellerId || "unknown");
        alert(response.data.message || "Login successful");
        navigate("/seller-dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || "Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Seller Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Additional Login Options */}
        <div className="other-login-options">
          <h5>Other Login Options</h5>
          <button className="secondary-btn">Login with OTP</button>
          <button className="secondary-btn">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
