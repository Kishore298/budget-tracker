import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, error: authError, clearError } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");  
    clearError();       

    if (!email || !password) {
      setLocalError("Both fields are required.");
      return;
    }

    try {
      await login(email, password);  
    } catch (err) {
      setLocalError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1 className="header-title">
        <span className="expense">Expense</span>{" "}
        <span className="tracker">Tracker</span>
      </h1>

      <h2>Login</h2>
      {localError && <p className="error-message">{localError}</p>}
      {authError && <p className="error-message">{authError}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p className="link-text">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
