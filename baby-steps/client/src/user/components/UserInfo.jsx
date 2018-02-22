import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { api } from '../../api';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: this.props.user,
      oldUser: this.props.user,
      editing: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveEditClick= this.handleSaveEditClick.bind(this);
    this.handleChangeUserInfo = this.handleChangeUserInfo.bind(this); 
    this.handleCancelClick = this.handleCancelClick.bind(this);        
  }

  handleChangeUserInfo(userInfo) {
    api.user.update(userInfo, (user) => {
      this.props.loadedUser(user);
    });
  }

  handleChange(value, key) {
    this.setState({
      user: {
        ...this.state.user,
        [key]: value
      }
    });
  }

  handleCancelClick() {
    this.setState({
      editing: false,
      user: {
        ...this.state.oldUser
      }
    })
  }

  handleSaveEditClick() {
    if (this.state.editing) {
      this.handleChangeUserInfo(this.state.user);
      console.log('save');
      this.setState({
        editing: false
      });
    } else {
      this.setState({
        editing: true
      });
    }
  }

  render() {
    return (
      <div className={'userInfoContainer'}>
        <Paper style={{ padding: 25 }}>
          <h1>Your Information</h1>
          {this.state.editing &&
            <div>
              <TextField
                hintText="David"
                floatingLabelText="First Name"
                type="firstname"
                fullWidth
                value={this.state.user.firstname}                               
                onChange={(event, value)=>{this.handleChange(value, 'firstname')}}
              />
              <TextField
                hintText="Manchester"
                floatingLabelText="Last Name"
                type="lastname"
                fullWidth
                value={this.state.user.lastname}               
                onChange={(event, value)=>{this.handleChange(value, 'lastname')}}
              />
              <TextField
                hintText="parent@babysteps.com"
                floatingLabelText="Email"
                type="email"
                fullWidth
                value={this.state.user.email}
                onChange={(event, value)=>{this.handleChange(value, 'email')}}
              />
            </div>
          }
          {!this.state.editing &&
            <div>
              <p>{this.state.user.firstname} {this.state.user.lastname}</p>
              <p>{this.state.user.email}</p>                            
            </div>
          }
          <div className="actions">
            {this.state.editing &&
              <FlatButton label={'Cancel'} onClick={this.handleCancelClick}/>
            }
            <FlatButton label={this.state.editing ? 'Save' : 'Edit'} onClick={this.handleSaveEditClick}/>
          </div>
        </Paper>
      </div>
    );
  }
}

export default UserInfo;