// src/components/AppRoutes.js
import React from 'react';
import $ from 'jquery';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MyFamilyManager from './MyFamilyManager';
import Login from '../user/components/Login';
import Signup from '../user/components/Signup';
import AccountManager from '../user/components/AccountManager';
import Dashboard from './Dashboard';
import LandingManager from './LandingManager';
import { PrivateRoute } from './PrivateRoute';
import { api } from '../api';
import { loadedUser } from '../user/actions';
import { user } from '../user/reducers';

class AppRoutes extends React.Component {
  constructor() {
    super();
    console.log('app routes ran constructor');
    this.loginSuccess = this.loginSuccess.bind(this);
    this.logoutSuccess = this.logoutSuccess.bind(this);
  }

  loginSuccess(user) {
    this.props.loadedUser(user);
  }

  logoutSuccess() {
    this.props.loadedUser(null);
  }

  render() {
    let user= this.props.account;
    return (
      <div>
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)} >
          <Switch>
            <PrivateRoute path="/app/myfamily/:id" component={MyFamilyManager} user={user} loadedUser={this.props.loadedUser}/>
            <PrivateRoute path="/app/myaccount" component={AccountManager} user={user} loadedUser={this.props.loadedUser}/>         
            <PrivateRoute path="/app" component={Dashboard} user={user} loadedUser={this.props.loadedUser}/>              
            <Route exact path="/" component={LandingManager}/>  
            <Route 
              path="/login"
              render={(routeProps) =>(
                <Login {...routeProps} loginSuccess={this.loginSuccess}/>
              )}
            />
            <Route 
              path="/signup"
              render={(routeProps) =>(
                <Signup {...routeProps} loginSuccess={this.loginSuccess}/>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.user
  }),
  {
    loadedUser
  }
)(AppRoutes);