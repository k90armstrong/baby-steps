import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import styles from '../styles/inviteFamilyMember.css';
import { api } from '../../api';

class InviteFamilyMember extends React.Component {
    constructor() {
      super();
      this.state = {
        email: ''
      }
    }

    handleChange = (event) => {
      this.setState({
        email: event.target.value
      });
    }

    render() {
			return (
        <div>
          {this.props.open &&
            <div>
              <div className={'modal'}>
                <Paper>
                  <div className={'modalBody'}>
                    <div style={{ fontSize: 18, fontWeight: 100,opacity: '0.6' }}>Share Family</div>
                    <p>
                      Enter the email of the user you would like to share the 
                      <strong> {this.props.family.name}</strong> family with!
                    </p>
                    <div>
                    <TextField
                      hintText="dmanchester@baby-steps.com"
                      type={"email"}
                      onChange={this.handleChange}
                    />
                    </div>
                    <div className={'actions'}>
                      <FlatButton 
                        label={'Cancel'}
                        onClick={this.props.handleClose}
                      />
                      <FlatButton 
                        label={'Submit'}
                        onClick={this.props.handleInviteSubmit}
                      />
                    </div>
                  </div>
                </Paper>
              </div>
              <div style={{
                zIndex: 2000,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: '0.6'
                }}
                onClick={this.props.handleClose}
              >
              </div>
            </div>
          }
        </div>
			);
    }
}

export default InviteFamilyMember;