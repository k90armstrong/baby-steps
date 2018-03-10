import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import { api } from '../../api';

class FamilyCard extends React.Component {
    constructor(props) {
			super(props);

			this.state = {
        family: this.props.family
			};
		}
    render() {
			return (
        <div style={{ width: 'auto', margin: 10 }}>
          <Paper>
            {this.state.family && 
              <div>
                <div>{this.state.family.name} Family</div>
                <img src={this.state.family.Images[0].url} style={{height: 300}} />
                  <FlatButton 
                    label={'Invite Family Member'}
                    onClick={()=>this.props.handleFamilyInviteClick(this.state.family)}
                  />
                  <FlatButton 
                    label={'View Family'}
                  />
                  <FlatButton 
                    label={'Delete Family'}
                    onClick={()=>this.props.handleFamilyDeleteClick(this.state.family)}
                  />
                  <FlatButton 
                    label={'Add Child'}
                    onClick={()=>this.props.handleAddChildClick(this.state.family)}
                  />
              </div>
            }
            {!this.state.family && 
              <div>
                <FlatButton 
                  label={'Add Family'}
                  onClick={()=>this.props.handleAddFamily()}
                />
              </div>
            }
          </Paper>
        </div>
			);
    }
}

export default FamilyCard;