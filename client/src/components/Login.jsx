import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { loginUser, authError } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();


    const loginDetails = {
      username,
      password
    };

    
    loginUser(loginDetails);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {authError && <p className="error">{authError}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};
