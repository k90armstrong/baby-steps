import React from 'react';
import { Link } from 'react-router-dom';

class LandingManager extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <div>
          Hello Welcome to Baby Steps
        </div>
        <div>
          <Link to="/login">Login Here</Link>
        </div>
        <div>
          <Link to="/signup">Signup Here</Link>
        </div>
      </div>
    );
  }
}

export default LandingManager;