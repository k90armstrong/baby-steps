import {
    LOADED_USER,
    LOADED_USER_ERROR,
    UPDATED_ACCOUNT,
    UPDATED_ACCOUNT_ERROR
  } from './actions';
  
  const initialState = {
    account: null,
    error: null
  };
  
  export function user(state = initialState, action) {
    switch (action.type) {
      case LOADED_USER:
        return {
          ...state,
          account: action.account
        };
      case LOADED_USER_ERROR:
        return {
          ...state,
          account: null,
          error: action.error
        };
      case UPDATED_ACCOUNT:
        return {
          ...state,
          account: action.account
        };
      case UPDATED_ACCOUNT_ERROR:
        return {
          ...state,
          purchasingError: action.error,
          error: action.error
        };
      default:
        return state;
    }
  }
  