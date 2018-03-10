import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import styles from '../styles/addFamily.css';
// import * as FilePond from 'filepond';
import { api } from '../../api';

class AddFamily extends React.Component {
    constructor() {
      super();
      this.state = {
        name: '',
        file: null
      }
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
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
      // let filePond = FilePond.create(inputElements[0]);
      console.log(inputElements);
    }

    render() {
			return (
        <div>
          {this.props.open &&
            <div>
              <div className={'modal'}>
                <Paper>
                  <div className={'modalBody'}>
                    <div style={{ fontSize: 18, fontWeight: 100,opacity: '0.6' }}>Create Family and Save Memories</div>
                    <div>
                      <TextField
                        hintText="Manchester"
                        type={"text"}
                        onChange={this.handleChange}
                        floatingLabelText={"Family Name"}
                        name={"name"}
                      />
                      <input className='filepond' type='file' onChange={this.handleImageUpload} style={{marginTop:'40px'}}/>

                    </div>
                    <div className={'actions'}>
                      <FlatButton 
                        label={'Cancel'}
                        onClick={this.props.handleClose}
                      />
                      <FlatButton 
                        label={'Submit'}
                        onClick={()=>{
                          let familyInfo = {
                            name: this.state.name,
                            picture: this.state.file
                          }
                          this.props.handleSubmit(familyInfo)
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

export default AddFamily;