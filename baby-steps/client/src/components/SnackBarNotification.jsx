import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackBarNotification extends React.Component {
  render() {
    return (
      <div>
        <Snackbar
          style={{ width: 300 }}
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={this.props.handleRequestClose}
        />
      </div>
    );
  }
}