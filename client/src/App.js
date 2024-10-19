import React from 'react'; 
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { Incomeexpense } from './components/Incomeexpense';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/Addtransaction';
import { AuthContext } from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <>
      <AuthContext.Consumer>
        {({ isAuthenticated }) => (
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegistrationForm />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <>
                    <Header />
                    <div className="container">
                      <Balance />
                      <Incomeexpense />
                      <TransactionList />
                      <AddTransaction />
                    </div>
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        )}
      </AuthContext.Consumer>
    </>
  );
}

export default App;










