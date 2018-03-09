import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

const Invite = ({ invite, handleDeny, handleAccept }) => {

  return(
    <div>
      <Paper>
        <p>{`${invite.from} has invited you to join the ${invite.Family.name} family`}</p>
        <FlatButton 
          label={'No Thanks'}
          onClick={handleDeny}
        />
        <FlatButton 
          label={'Yes!'}
          onClick={handleAccept}
        />
      </Paper>
    </div>
  );
}

export default class Invites extends React.Component {
  render() {
    return (
      <div>
        <h1>Invites</h1>
        {this.props.invites.map(invite=>
          <Invite 
            key={invite.id}
            invite={invite}
            handleDeny={()=>this.props.handleDeny(invite)}
            handleAccept={()=>this.props.handleAccept(invite)}          
          />
        )}
      </div>
    );
  }
}