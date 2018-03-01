import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class Confirm extends React.Component {

  render() {
    const actions = [
      <FlatButton
        label={this.props.cancelTitle}
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label={this.props.confirmTitle}
        primary={true}
        onClick={this.props.handleConfirm}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          {this.props.message}
        </Dialog>
      </div>
    );
  }
}

export default Confirm;