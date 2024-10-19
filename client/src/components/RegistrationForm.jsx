import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const { register, error } = useContext(AuthContext);  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (!username || !email || !password) {
      setLocalError('All fields are required.');
      return;
    }

    // Register using context
    register(username, email, password);
  };

  return (
    <div className="form-container">
      <h1 className="header-title">
        <span className="expense">Expense</span>{" "}
        <span className="tracker">Tracker</span>
      </h1>
      <h2>Register</h2>
      {localError && <div className="error-message">{localError}</div>}
      {error && <div className="error-message">{error}</div>}  {/* Global error from context */}
      <form onSubmit={handleSubmit}>
        <input
          className="registration-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <input
          className="registration-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          className="registration-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <input
          className="registration-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
        <button type="submit" className="registration-btn">Register</button>
      </form>
      <p className="link-text">Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegistrationForm;




