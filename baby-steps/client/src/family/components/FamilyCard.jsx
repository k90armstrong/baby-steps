import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { api } from '../../api';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};
const styls = {
  chip: {
    margin: 5,
  },
  
};

const data = [
  {
    name:"jef",
    age:9
  },
  {
    name:"zoe",
    age:9
  },
  {
    name:"tom",
    age:9
  },
  {
    name:"sam",
    age:9
  }
  
];


class FamilyCard extends React.Component {
    constructor(props) {
			super(props);

			this.state = {
        family: this.props.family
      };
      
		}
    render() {
      
        
       
      
    const children = this.state.family.Children.map(child =>{
      return(
        <Chip
        style={{margin:7}}
        onClick={()=>this.props.handleChildClick(child)}
        >
          <Avatar src={child.Images[0].url} /> 
          {child.firstname}
      </Chip>
      );
    });
      
    return (
      
      
    <div style={{ width: 300, margin: 10 ,textAlign:'center',fontSize:18}}>
    
        <Paper>
          
          {this.state.family && 
            <div>
            <Card>
            

            <div>{this.state.family.name} Family</div>
            
            
              {/* <IconButton><MoreVertIcon /></IconButton> */}
              <CardMedia>
                <img src={this.state.family.Images[0].url} style={{height: 300}} />
              </CardMedia>
              </Card>
              <IconMenu
                  style={{float:"right"}}
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Invite Family Member"  onClick={()=>this.props.handleFamilyInviteClick(this.state.family)}/>
                <MenuItem primaryText="Delete" onClick={()=>this.props.handleFamilyDeleteClick(this.state.family)} />
                
                
              </IconMenu>
              {children}
              
                
                
                <FlatButton 
                  label={'Add Child'} primary={true}
                  onClick={()=>this.props.handleAddChildClick(this.state.family)}
                />
            </div>
            
          }
          
        </Paper>
      </div>
    );
  }
}

export default FamilyCard;