// src/components/MyFamilyManager.js
import React from 'react';
import { Link } from 'react-router-dom';
import BAppBar from '../components/BAppBar';
import { loadedUser } from '../user/actions';
import { connect } from 'react-redux';
import { api } from '../api';
import FamilyCard from '../family/components/FamilyCard';
import InviteFamilyMember from '../family/components/InviteFamilyMember';
import SnackBarNotification from '../components/SnackBarNotification';
import Confirm from '../components/Confirm';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      families: [],
      modal: {
        deleteFamily: false,
        inviteFamily: false
      },
      snackbar: {
        open: false,
        message: 'Invite sent!'
      }
    }
  }

  loadedFamilies = (families) => {
    this.setState({ families });
  }

  componentWillMount() {
    this.loadFamilies();
  }

  loadFamilies = () => {
    api.family.getFamilies((families)=>{
      this.loadedFamilies(families);
    },()=>{console.log('fail');})
  }

  handleFamilyDeleteClickConfirm = () =>{
    api.family.deleteFamily(this.state.activeFamily.id, (response) => {
      if (response.message === 'success') {
        this.loadFamilies();
        this.toggleModal('deleteFamily');
      }
    }, () => {
      console.log('there was an error deleting this family');
      this.toggleModal('deleteFamily');      
    });
  }

  handleFamilyDeleteClick = (family) => {
    this.setState({
      activeFamily: family
    }, ()=>this.toggleModal('deleteFamily'))
  }

  handleFamilyInviteClick = (family) => {
    this.setState({
      activeFamily: family
    }, ()=>this.toggleModal('inviteFamily'))
  }

  handleInviteSubmit = () => {
    api.family.share(this.state.activeFamily.id, 
      (response)=>{
        if (response.message === 'success') {
          this.showSnackbar('Invite Sent!');
        }
        this.setState({
          activeFamily: false,
        }, ()=>this.toggleModal('inviteFamily'));
      },
      (response)=>{
        console.log('error inviting');
    });
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      snackbar: {
        open: false
      }
    })
  }

  showSnackbar = (message) => {
    this.setState({
      snackbar: {
        message,
        open: true
      }
    });
  }

  toggleModal = (type) => {
    this.setState({
      modal: {
        [type]: !this.state.modal[type]
      }
    })
  }

  render() {
    return (
      <div>
        <BAppBar 
          accountClicked={()=>this.props.history.push('/app/myaccount')}
          logoutSuccess={this.props.loadedUser}
        />
        <div>
          {this.state.families.map((family, index)=>{
            return(
              <FamilyCard
                key={index}
                family={family}
                handleFamilyDeleteClick={this.handleFamilyDeleteClick}
                handleFamilyInviteClick={this.handleFamilyInviteClick}
              />
            );
          })}
          <FamilyCard
            key={'add'}
            handleAddFamily={()=>{}}
          />
        </div>
        <Confirm 
          title={'Delete Family'}
          handleClose={()=>this.toggleModal('deleteFamily')}
          handleConfirm={this.handleFamilyDeleteClickConfirm}
          open={this.state.modal.deleteFamily}
          cancelTitle={'Nope'}
          confirmTitle={'Yes Please'}
          message={'Deleting this family will remove all children and events FOREVER, are you sure you want to do this?'}
        />
        <InviteFamilyMember
          family={this.state.activeFamily}
          open={this.state.modal.inviteFamily}
          handleClose={()=>this.toggleModal('inviteFamily')}
          handleInviteSubmit={this.handleInviteSubmit}
        />
        <SnackBarNotification
          onRequestClose={this.handleSnackbarRequestClose}
          message={this.state.snackbar.message}
          open={this.state.snackbar.open}
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
)(Dashboard);