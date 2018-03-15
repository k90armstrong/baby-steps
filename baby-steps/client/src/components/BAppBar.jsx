import React from 'react';
import AppBar from 'material-ui/AppBar';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadedUser } from '../user/actions';
import { user } from '../user/reducers';
import UserInfoButton from '../user/components/UserInfoButton';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: 15
};

const Login = () => {
  return (
    <div>
      <Link style={linkStyle} to='/signup'>Signup</Link>
      <Link style={linkStyle} to='/login'>Login</Link>
    </div>
  );
}

class BAppBar extends React.Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
    this.handleLogoutResponse = this.handleLogoutResponse.bind(this);
  }
  componentWillMount(props) {
    this.loadUser();
  }

  loadUser() {
    api.user.loadUser(this.props.loadedUser, ()=>{});
  }

  logout() {
    api.user.logout(this.handleLogoutResponse);
  }

  handleLogoutResponse(data) {
    if (data.message === 'success') {
      this.props.logoutSuccess(null);
    }
  }

  handleGoTOLogin() {

  }



  render () {
    let rightElement;
    if (this.props.account) {
      if (!this.props.account.error) {
        rightElement = <UserInfoButton user={this.props.account} accountClicked={this.props.accountClicked} logoutClicked={this.logout} />;
      } else {
        rightElement = <Login/>;
      }
    }
    return (
      <AppBar
        title={<Link style={{ textDecoration: 'none', color: 'white' }} to='/'>Baby Steps</Link>}
        // iconClassNameRight={"fab fa-accessible-icon"}
        iconElementRight={rightElement}
      />
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
)(BAppBar);