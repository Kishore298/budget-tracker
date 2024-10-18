import React, { useContext } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { Incomeexpense } from './components/Incomeexpense';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/Addtransaction';
import { GlobalProvider } from './context/GlobalState';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Login } from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <RegistrationForm />} />
            <Route
              path="/"
              element={
                user ? (
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
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;







