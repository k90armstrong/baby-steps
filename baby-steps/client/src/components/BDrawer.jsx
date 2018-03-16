import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const linkStyle = {
  color: 'grey',
  textDecoration: 'none',
  marginRight: 15
};

export default class BDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <Drawer open={this.props.open}>
          <span onClick={this.props.handleClose} style={{cursor: 'pointer', position: 'relative', left: 225, top: 5}}>
            <i className={"far fa-times-circle"} />
          </span>
          <MenuItem><Link style={linkStyle} to='/app/dashboard'>Families</Link></MenuItem>
          <MenuItem><Link style={linkStyle} to='/login'>Login</Link></MenuItem>
        </Drawer>
      </div>
    );
  }
}