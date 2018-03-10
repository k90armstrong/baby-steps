import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import styles from '../../family/styles/addFamily.css';
import DatePicker from 'material-ui/DatePicker';
import * as FilePond from 'filepond';
import { api } from '../../api';

class AddChild extends React.Component {
    constructor() {
      super();
      this.state = {
        file: null,
        firstname: '',
        lastname: '',
        weight: '',
        height: '',
        hospitalborn: '',
        gender: '',
        birthdate: ''
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
        birthdate: date
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
                    <div style={{ fontSize: 18, fontWeight: 100,opacity: '0.6' }}>Create Family and Save Memories</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      <TextField
                        hintText="Sam"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Child's Name"}
                        name={"firstname"}
                        style={{ margin: 5 }}
                      />
                      <TextField
                        hintText="Manchester"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Child's Last Name"}
                        name={"lastname"}
                        style={{ margin: 5 }}                        
                      />
                      <TextField
                        hintText="5 lbs 3 oz"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Birth Weight"}
                        name={"weight"}
                        style={{ margin: 5 }}                        
                      />
                      <TextField
                        hintText="21 inches"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Birth Height"}
                        name={"height"}
                        style={{ margin: 5 }}                        
                      />
                      <TextField
                        hintText="England Regional"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Hospital"}
                        name={"hospitalborn"}
                        style={{ margin: 5 }}                        
                      />
                      <TextField
                        hintText="male"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Gender"}
                        name={"gender"}
                        style={{ margin: 5 }}                        
                      />
                      <DatePicker 
                        hintText="Birthdate" 
                        openToYearSelection={true} 
                        onChange={this.handleDateChanged}
                      />
                      <input className='filepond' type='file' onChange={this.handleImageUpload}/>
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

export default AddChild;