import React from 'react';
import Paper from 'material-ui/Paper';

class ProfilePreview extends React.Component {
  constructor() {
    super();
    console.log('Preview constructor');
  }

  render () {
    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    return(
      <div>
        <Paper style={style} zDepth={2} rounded={false}>
          <h1>{this.props.child.firstname}</h1>
          <img src={this.props.child.imageurl}/>
          <h4>{`Age: ${this.props.child.age}`}</h4>
        </Paper>
      </div>
    );
  }

}