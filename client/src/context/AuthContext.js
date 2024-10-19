import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    case 'REGISTER_SUCCESS': 
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
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null, 
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://budget-tracker-48rj.onrender.com/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: res.data.user, token },
        });
      })
      .catch(() => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login'); 
      });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, [navigate]);

const login = async (email, password) => {
  try {
    const res = await axios.post('https://budget-tracker-48rj.onrender.com/api/v1/auth/login', { email, password });
    console.log('Login response:', res.data); 
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    navigate('/'); 
  } catch (error) {
    dispatch({ type: 'AUTH_ERROR', payload: error.response?.data?.message || 'Login failed.' });
  }
};

const register = async (username, email, password) => {
  try {
    const res = await axios.post('https://budget-tracker-48rj.onrender.com/api/v1/auth/register', {
      username,
      email,
      password,
    });
    console.log('Register response:', res.data); 
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });  
    navigate('/login'); 
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
      payload: error.response?.data?.message || 'Registration failed.',
    });
  }
};


  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); 
  };
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      error: state.error,
      login,
      register, 
      logout,
      clearError, 
    }}>
      {children}
    </AuthContext.Provider>
  );
};



