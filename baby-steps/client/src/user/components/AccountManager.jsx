import React from 'react';
import { loadedUser } from '../../user/actions';
import { api } from '../../api';
import { connect } from 'react-redux';
import BAppBar from '../../components/BAppBar';
import UserInfo from './UserInfo';
import Invites from '../../user/components/Invites';
import styles from './styles/accountManager.css';

class AccountManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invites: []
    }
  }

  componentWillMount() {
    this.getInvites();
  }

  getInvites = () => {
    api.invites.all((invites)=>{
      console.log(invites);
      this.setState({ invites });
    },()=>{
      console.log('invites not found');
    });
  }

  handleAcceptInvitation = (invite) => {
    api.invites.respond(invite.id, 'accept', this.getInvites, this.getInvites);
  }

  handleDenyInvitation = (invite) => {
    api.invites.respond(invite.id, null, this.getInvites, this.getInvites);
  }

  render() {
    return (
      <div>
        <BAppBar 
          accountClicked={()=>this.props.history.push('/app/myaccount')}
          logoutSuccess={this.props.loadedUser}
        />
        {`Hello ${this.props.account.firstname}`}
        <UserInfo user={this.props.account} loadedUser={this.props.loadedUser}/>
        {this.state.invites.length > 0 && 
          <Invites 
            invites={this.state.invites}
            handleAccept={this.handleAcceptInvitation}
            handleDeny={this.handleDenyInvitation}            
          />
        }
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
  )(AccountManager);