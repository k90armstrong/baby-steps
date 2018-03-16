// src/components/MyFamilyManager.js
import React from 'react';
import { Link } from 'react-router-dom';
import BAppBar from '../components/BAppBar';
import { loadedUser } from '../user/actions';
import { connect } from 'react-redux';
import { api } from '../api';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FamilyCard from '../family/components/FamilyCard';
import AddChild from '../child/components/AddChild';
import InviteFamilyMember from '../family/components/InviteFamilyMember';
import AddFamily from '../family/components/AddFamily';
import SnackBarNotification from '../components/SnackBarNotification';
import Confirm from '../components/Confirm';
// not sure we need this on this page.
// import './styles/dashboard.css' 


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      families: [],
      modal: {
        deleteFamily: false,
        inviteFamily: false,
        addFamily: false,
        addChild: false
      },
      snackbar: {
        open: false,
        message: 'Invite sent!'
      }
    }
  }

  loadedFamilies = (families) => {
    console.log(families);
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

  handleInviteSubmit = (email) => {
    let inviteInfo = {
      email,
      familyId: this.state.activeFamily.id
    }
    console.log(inviteInfo);
    api.family.share(inviteInfo, 
      (response)=>{
        if (response.message === 'success') {
          this.showSnackbar('Invite Sent!');
        } else {
          this.showSnackbar('Sorry no one with this email exists, or something else happened!')
        }
        this.setState({
          activeFamily: false,
        }, ()=>this.toggleModal('inviteFamily'));
      },
      (response)=>{
        console.log('error inviting');
    });
  }

  handleAddFamily = (familyInfo) => {
    let formData = new FormData();
    formData.append('image', familyInfo.picture);
    formData.append('name', familyInfo.name);
    api.family.add(formData, 
      (response)=>{
        this.toggleModal('addFamily');
        this.showSnackbar('Success! Start saving memories!');
        this.loadFamilies();
    }, (response)=>{
      this.showSnackbar('Sorry there was an error creating a family');
    });
  }

  handleAddChildClick = (family) => {
    this.setState({
      activeFamily: family
    }, ()=>this.toggleModal('addChild'))
  }

  handleAddChild = (childInfo) => {
    let formData = new FormData();
    formData.append('image', childInfo.file);
    formData.append('firstname', childInfo.firstname);
    formData.append('lastname', childInfo.lastname);
    formData.append('weight', childInfo.weight);
    formData.append('height', childInfo.height);
    formData.append('hospitalborn', childInfo.hospitalborn);
    formData.append('gender', childInfo.gender);
    formData.append('birthdate', childInfo.birthdate);
    formData.append('familyId', this.state.activeFamily.id); 
    api.child.add(formData, 
      (response)=>{
        this.toggleModal('addChild');
        this.showSnackbar('Success! Start saving memories!');
        this.loadFamilies();
    }, (response)=>{
      this.showSnackbar('Sorry there was an error creating a child');
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
handleChildClick = (child)=>{
 this.props.history.push('/app/child-profile/'+child.id)

  
}
  render() {
    return (
      <div>
        <BAppBar 
          accountClicked={()=>this.props.history.push('/app/myaccount')}
          logoutSuccess={this.props.loadedUser}
        />
        <div style={{ display: 'flex' }}>
          {this.state.families.map((family, index)=>{
            return(
              <FamilyCard
                key={index}
                family={family}
                handleFamilyDeleteClick={this.handleFamilyDeleteClick}
                handleFamilyInviteClick={this.handleFamilyInviteClick}
                handleAddChildClick={this.handleAddChildClick}  
                handleChildClick={this.handleChildClick}              
              />
            );
          })}
        </div>
        <div>
              {/* <FlatButton  */}
              <div style={{ position:"fixed",bottom:10,right:10,width:71,height:71}}>
              
              
  
              
              <FloatingActionButton style={{color:"blue"}} onClick={()=>this.toggleModal('addFamily')}>
              <ContentAdd />
              
            
                label={'Add Family'}
                
                </FloatingActionButton>
              Add Family
            </div>
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
        <AddFamily
          open={this.state.modal.addFamily}
          handleClose={()=>this.toggleModal('addFamily')}
          handleSubmit={this.handleAddFamily}
        />
        <SnackBarNotification
          onRequestClose={this.handleSnackbarRequestClose}
          message={this.state.snackbar.message}
          open={this.state.snackbar.open}
        />
        <AddChild 
          open={this.state.modal.addChild}
          handleClose={()=>this.toggleModal('addChild')}
          handleSubmit={this.handleAddChild}          
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