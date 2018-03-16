import React from 'react';
import AppBar from 'material-ui/AppBar';
import { api } from '../api';
import { connect } from 'react-redux';
import { loadedUser } from '../user/actions';
import { user } from '../user/reducers';
import UserInfoButton from '../user/components/UserInfoButton';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

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
    api.user.loadUser(this.props.loadedUser);
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
    return (
      <AppBar
        title={this.props.account ? this.props.account.firstname : ''} 
        iconElementLeft={
          <div>
          <FlatButton label="Go Back" href=""/>
          
        </div>
        }
       // iconClassNameRight={"fab fa-accessible-icon"}
        iconElementRight={<UserInfoButton user={this.props.account} accountClicked={this.props.accountClicked} logoutClicked={this.logout} />}
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