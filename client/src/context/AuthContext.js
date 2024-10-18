import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: true,
  isAuthenticated: false,
  error: null,
};


export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) {
      axios.get('https://budget-tracker-48rj.onrender.com/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${state.token}` }
      })
        .then(res => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: res.data.user, token: state.token }
          });
        })
        .catch(() => {
          dispatch({ type: 'AUTH_ERROR', payload: 'Invalid token' });
        });
    }
  }, [state.token]);

  
  const login = async (email, password) => {
    try {
      const res = await axios.post('https://budget-tracker-48rj.onrender.com/api/v1/auth/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.response.data.message });
    }
  };


  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
