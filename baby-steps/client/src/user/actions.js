export const LOADED_USER = 'LOADED_USER';
export const LOADED_USER_ERROR = 'LOADED_USER_ERROR';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATED_ACCOUNT = 'UPDATED_ACCOUNT';
export const UPDATED_ACCOUNT_ERROR = 'UPDATED_ACCOUNT_ERROR';

export const loadedUser = account => ({
  type: LOADED_USER,
  account
});

export const loadedUserError = error => ({
  type: LOADED_USER_ERROR,
  error
});

export const updateAccount = () => ({
  type: UPDATE_ACCOUNT
});

export const updatedAccount = account => ({
  type: UPDATED_ACCOUNT,
  account
});

export const updatedAccountError = error => ({
  type: UPDATED_ACCOUNT_ERROR,
  error
});

