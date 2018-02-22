// src/components/MyFamilyManager.js
import React from 'react';
import { Link } from 'react-router-dom';
import BAppBar from '../components/BAppBar';
import { loadedUser } from '../user/actions';
import { connect } from 'react-redux';

class MyFamilyManager extends React.Component {
  render() {
    return (
      <div>
        <BAppBar 
          accountClicked={()=>this.props.history.push('/myaccount')}
          logoutSuccess={this.props.loadedUser}
        />
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
)(MyFamilyManager);