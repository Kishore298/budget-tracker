import React, { useContext, useState } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { Incomeexpense } from './components/Incomeexpense';
import { Transactionlist } from './components/Transactionlist';
import { Addtransaction } from './components/Addtransaction';
import { Login } from './components/Login';
import { Register } from './components/Register';

import { GlobalProvider, GlobalContext } from './context/GlobalState';

import './App.css';

function App() {
  const { token, logout } = useContext(GlobalContext); 
  const [showLogin, setShowLogin] = useState(false);  // State to toggle between forms

  const toggleAuthForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        {token ? (
          <>
            <button type="button" onClick={logout} className="btn-logout">Logout</button>
            <Balance />
            <Incomeexpense />
            <Transactionlist />
            <Addtransaction />
          </>
        ) : (
          <>
            {showLogin ? (
              <>
                <Login />
                <p>
                  Don't have an account?{' '}
                  <button type="button" className="toggle-btn" onClick={toggleAuthForm}>
                    Register here
                  </button>
                </p>
              </>
            ) : (
              <>
                <Register />
                <p>
                  Already have an account?{' '}
                  <button type="button" className="toggle-btn" onClick={toggleAuthForm}>
                    Login here
                  </button>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </GlobalProvider>
  );
}

export default App;

