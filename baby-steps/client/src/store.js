import { compose, applyMiddleware, createStore, combineReducers } from 'redux';

import { user } from './user/reducers';

const app = combineReducers({
    user
  });

export const Store = createStore(
    app, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
