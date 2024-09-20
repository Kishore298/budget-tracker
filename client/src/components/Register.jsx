import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { registerUser, authError } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();


    const registrationDetails = {
      username,
      password
    };

    
    registerUser(registrationDetails);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {authError && <p className="error">{authError}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
          />
        </div>
        <button type="submit" className="btn-register">Register</button>
      </form>
    </div>
  );
};
