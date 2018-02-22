import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Link from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class UserInfoButton extends React.Component {

  constructor() {
    super();
    this.state = {
      showMenu: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.accountClicked = this.accountClicked.bind(this);
  }

  handleClick() {
    if (this.props.user) {
      // we are logged in and we need to show the menu
    } else {
      // we need to go to the login page
      // this.context.router.push('/login');
    }
  }

  accountClicked() {
    this.props.history.push('/myaccount');
  }

  render() {
    let user = this.props.user;
    let styles = {
      button: {
        color: 'white'
      }
    }
    return (
      <div>
        {!user &&
          <FlatButton
            label={'LOGIN'}
            labelPosition="before"
            style={styles.button}
            containerElement="label"
            onClick={this.handleLoginClick}
          />
        }
        {user &&
          <IconMenu
            iconButtonElement={
              <FlatButton
                label={user.firstname}
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                icon={<FontIcon style={{ fontSize: '15px' }}className="fa fa-chevron-circle-down"/>}
              />}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="Account" onClick={this.props.accountClicked}/>
            <MenuItem primaryText="Log out" onClick={this.props.logoutClicked}/>
          </IconMenu>
        }
      </div>
    );
  }
}

export default UserInfoButton;