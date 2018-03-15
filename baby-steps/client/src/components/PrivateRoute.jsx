import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { api } from '../api';

export const PrivateRoute = ({ component: Component, user: User, loadedUser: loadedUser, ...rest }) => (
  <div>
    {User &&
      <Route {...rest} render={(props) => (
        User && User.status
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    }
    {!User &&
      api.user.loadUser((user)=>{
        loadedUser(user);
      }, ()=>{})
    }
  </div>
);