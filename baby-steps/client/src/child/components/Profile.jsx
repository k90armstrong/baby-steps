import React from 'react';
import moment from 'moment';
class Profile extends React.Component {
    render() {
        const bithday = moment(this.props.child.birthdate).format("MMM Do YY");
        return (
            <div className="col col-md-2" style={grayLord}>
            <div>
                <div className="card">
                    <h1 id="kidsName">{this.props.child.firstName}</h1>
                    <div className="fakeimg" style={smallYep}><img src={this.props.child.Images[0].url}/></div>
                    <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                </div>
                <div className="card">
                    <span>Weight: {this.props.child.weight} </span>
                    <span id="weight"></span>
                    <span>Length: {this.props.child.length} </span>
                    <span id="length"></span>
                    <span>Birthday: {birthday} </span>
                    <span id="birthday"></span>
                </div>
            </div>
        </div>

            

        )
    }

}
export default Profile;