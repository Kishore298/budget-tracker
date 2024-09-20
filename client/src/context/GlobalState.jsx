import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';


const initialState = {
  transactions: [],
  error: null,
  loading: true,
  token: localStorage.getItem('token'), 
  authError: null 
};

export const GlobalContext = createContext(initialState);


export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  
  async function loginUser(userData) {
    try {
      const res = await axios.post('/api/v1/auth/login', userData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.token
      });

      localStorage.setItem('token', res.data.token); 
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error
      });
    }
  }
  
  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions', {
        headers: {
          Authorization: `Bearer ${state.token}` 
        }
      });

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

 
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}` 
        }
      });

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

 
  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}` 
      }
    };

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  
  async function registerUser(userData) {
    try {
      const res = await axios.post('/api/v1/auth/register', userData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data.token
      });

      localStorage.setItem('token', res.data.token); 
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error
      });
    }
  }

  
 

 
  function logout() {
    console.log('Logout function called');
    localStorage.removeItem('token'); 
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        token: state.token,
        authError: state.authError,
        getTransactions,
        deleteTransaction,
        addTransaction,
        registerUser,
        loginUser,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
