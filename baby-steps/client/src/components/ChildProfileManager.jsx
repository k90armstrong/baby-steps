// src/components/MyFamilyManager.js
import React from 'react';
import { Link } from 'react-router-dom';
import BAppBar from '../components/BAppBar';
import { loadedUser } from '../user/actions';
import { connect } from 'react-redux';
import { api } from '../api';
import SnackBarNotification from '../components/SnackBarNotification';
import SingleChildProfile from '../components/SingleChildProfile';
import AddEvent from '../child/components/AddEvent';


class ChildProfileManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: {
        addEvent: false
      },
      childId: this.props.match.params.id,
      snackbar: {
        open: false,
        message: 'Invite sent!'
      },
      child: {}
    }
  }

  componentDidMount() {
    this.loadChild();
  }

  loadChild = () => {
    api.child.load(this.state.childId, this.loadedChild, this.loadedChildError);
  }

  loadedChild = (child) => {
    console.log('child', child);
    this.setState({child});
  }

  loadedChildError = () => {
    console.log('error loading child');
  }

  toggleModal = (type) => {
    this.setState({
      modal: {
        [type]: !this.state.modal[type]
      }
    })
  }

  handleSubmitEvent = (eventInfo) => {
    let formData = new FormData();
    formData.append('image', eventInfo.file);
    formData.append('title', eventInfo.title);
    formData.append('description', eventInfo.description);
    formData.append('date', eventInfo.date);
    formData.append('story', eventInfo.story);
    formData.append('childId', this.state.childId);    
    api.event.add(formData, 
      (response)=>{
        this.toggleModal('addChild');
        this.showSnackbar('Success!');
        this.loadChild();
    }, (response)=>{
      this.showSnackbar('Sorry there was an error creating the event');
    });
  }

  showSnackbar = (message) => {
    this.setState({
      snackbar: {
        message,
        open: true
      }
    });
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      snackbar: {
        open: false
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
        <SingleChildProfile
          handleAddEventClick={()=>this.toggleModal('addEvent')}
          child={this.state.child}
        />
        <AddEvent
          open={this.state.modal.addEvent}
          handleClose={()=>this.toggleModal('addEvent')}
          handleSubmit={this.handleSubmitEvent}
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
)(ChildProfileManager);