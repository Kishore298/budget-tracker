const AppReducer = (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [ ...state.transactions, action.payload ]
      };

    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload, 
        authError: null 
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        authError: action.payload 
      };

    case 'LOGOUT':
      return {
        ...state,
        token: null, 
        transactions: [] 
      };

    default:
      return state;
  }
};

export default AppReducer;


