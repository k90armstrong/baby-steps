import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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
      
        
       
      
      const children = data.map(child =>{
        return <div> {child.name}</div>
      
        })
      
			return (
        
        
      <div style={{ width: 300, margin: 10 ,textAlign:'center',fontSize:18}}>
      
          <Paper>
            
            {this.state.family && 
              <div>
             <Card>
              

              <div>{this.state.family.name} Family</div>
              
              
                {/* <IconButton><MoreVertIcon /></IconButton> */}
                <CardMedia>
                  
                <img src="http://www.mentalhealthy.co.uk/sites/default/files/bigstock_Cartoon_Family_Tree_7532794.jpg" alt="" width={30} height={140} />
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
                  <MenuItem primaryText="Share" />
                  <MenuItem primaryText="Delete" />
                  
                </IconMenu>
                <Chip
                style={{margin:7}}
                >

              
                
            <Avatar src="https://images-na.ssl-images-amazon.com/images/G/01/books/burnsj/SmilingBaby._V358926112_.jpg" /> 
          
                { children }
                </Chip>
                
                  <FlatButton 
                    label={'Invite Family Member'} primary={true}
                    onClick={()=>this.props.handleFamilyInviteClick(this.state.family)}
                  />
                  <FlatButton 
                    label={'View Family'} primary={true}
                  />
                  <FlatButton 
                    label={'Delete Family'} primary={true}
                    onClick={()=>this.props.handleFamilyDeleteClick(this.state.family)}
                  />
              </div>
              
            }
            {!this.state.family && 
              <div>
                {/* <FlatButton  */}
                <div style={{ position:"absolute",top:100,left:500,width:300,height:90}}>
                
                
    
                
                <FloatingActionButton style={{color:"blue"}}>
                <ContentAdd />
                
              
                  label={'Add Family'}
                  onClick={()=>this.props.handleAddFamily()}
                  </FloatingActionButton>
                Add Family
              </div>
              </div>
            }
          </Paper>
        </div>
			);
    }
}

export default FamilyCard;