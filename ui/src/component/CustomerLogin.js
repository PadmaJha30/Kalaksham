import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CustomerLogin.css";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/customers/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("customerId", response.data.customerId); // ✅ Store customerId
        alert("Login Successful!");
        navigate("/customer-dashboard"); // ✅ Redirect using useNavigate
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <Container className="login-box text-center">
          <h2>Customer Login</h2>

          {error && <Alert variant="danger">{error}</Alert>} {/* ✅ Show error message */}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            
            <Button variant="primary" className="mt-3 w-100" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>

          <div className="mt-4 other-login-options">
            <h5>Other Login Options</h5>
            <Link to="/login-phone">
              <Button variant="secondary" className="w-100 mb-2">Login by Phone Number</Button>
            </Link>
            <Link to="/login-otp">
              <Button variant="secondary" className="w-100">Login by OTP</Button>
            </Link>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default CustomerLogin;
