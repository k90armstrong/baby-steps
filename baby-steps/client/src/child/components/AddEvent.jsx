import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import styles from '../../family/styles/addFamily.css';
import DatePicker from 'material-ui/DatePicker';
import * as FilePond from 'filepond';
import { api } from '../../api';

class AddEvent extends React.Component {
    constructor() {
      super();
      this.state = {
        file: null,
        title: '',
        description: '',
        story: '',
        date: ''
      }
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleDateChanged = (a, date) => {
      console.log(date);
      this.setState({
       date: date
      });
    }

    handleImageUpload = (event) => {
      console.log(event.target.files);
      this.setState({
        file: event.target.files[0]
      });
    }

    componentWillMount() {
      console.log('i am running!')
      let inputElements = document.getElementsByClassName('filepond');
      let filePond = FilePond.create(inputElements[0]);
      console.log(inputElements);
    }

    render() {
			return (
        <div>
          {this.props.open &&
            <div>
              <div className={'modal'} style={{ width: '90%' }}>
                <Paper>
                  <div className={'modalBody'}>
                    <div style={{ fontSize: 18, fontWeight: 100,opacity: '0.6' }}>Create Events and Save Memories</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      <TextField
                        hintText="First Food"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"title"}
                         name={"title"}
                        style={{ margin: 5 }}
                      />
                      <TextField
                        hintText="Pudding"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"description"}
                        name={"description"}
                        style={{ margin: 5 }}                        
                      />
                      <TextField
                        hintText="loving vanilla pudding"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Story"}
                        name={"story"}
                        style={{ margin: 5 }}                        
                      />
                      
                      
                      
                      <DatePicker 
                        hintText="date" 
                        openToYearSelection={true} 
                        onChange={this.handleDateChanged}
                      />
                      { <input className='filepond' type='file' onChange={this.handleImageUpload} style={{marginTop:'40px'}}/> }
                    </div>
                    <div className={'actions'}>
                      <FlatButton 
                        label={'Cancel'}
                        onClick={this.props.handleClose}
                      />
                      <FlatButton 
                        label={'Submit'}
                        onClick={()=>{
                          this.props.handleSubmit(this.state)
                        }}
                      />
                    </div>
                  </div>
                </Paper>
              </div>
              <div style={{
                zIndex: 1000,
                
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: '0.6'
                }}
                onClick={this.props.handleClose}
              >
              </div>
            </div>
          }
        </div>
			);
    }
}

export default AddEvent;