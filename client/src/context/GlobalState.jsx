import React, { createContext, useReducer } from 'react'; 
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
  transactions: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const token = localStorage.getItem('token');

  async function getTransactions() {
    try {
      const res = await axios.get('https://budget-tracker-48rj.onrender.com/api/v1/transactions', {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Error fetching transactions' 
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`https://budget-tracker-48rj.onrender.com/api/v1/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Error deleting transaction' 
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const res = await axios.post('https://budget-tracker-48rj.onrender.com/api/v1/transactions', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Error adding transaction' 
      });
    }
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
