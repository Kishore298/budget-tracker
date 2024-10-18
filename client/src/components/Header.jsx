import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <h2>Expense Tracker Web Application</h2>
      <div className="user-info">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="btn-logout">Logout</button>
          </>
        ) : (
          <span>Welcome, Guest</span>
        )}
      </div>
    </header>
  );
};

