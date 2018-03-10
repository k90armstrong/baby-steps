// src/components/MyFamilyManager.js
import React from 'react';
import { Link } from 'react-router-dom';
import BAppBar from '../components/BAppBar';
import { loadedUser } from '../user/actions';
import { connect } from 'react-redux';
import { api } from '../api';
import SingleChildProfile from '../components/SingleChildProfile';


class ChildProfileManager extends React.Component {

  render() {
    return (
      <div>
        <BAppBar 
          accountClicked={()=>this.props.history.push('/app/myaccount')}
          logoutSuccess={this.props.loadedUser}
        />
        <SingleChildProfile/>
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
)(ChildProfileManager);