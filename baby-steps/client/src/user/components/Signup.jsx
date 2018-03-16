import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import styles from './styles/login.css';
import { api } from '../../api';
import { ICONS } from '../../svgs';

class Signup extends React.Component {
    constructor() {
			super();
			console.log('ran constructor for login');

			this.state = {
				email: '',
				password: '',
				failedSignup: false,
        signingUp: false,
        errorMessage: ''
			};
			
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleCancelClick = this.handleCancelClick.bind(this);			
			this.handleSignup = this.handleSignup.bind(this);
			this.signupResponse = this.signupResponse.bind(this);
		}
		
		handleChange(value, type) {
			this.setState({
				[type]: value
			});
		}

		handleSubmit() {
			console.log(this.state.email, this.state.password);
		}

		handleSignup(userInfo) {
      this.setState({ failedSignup: false, errorMessage: '' });
      if (userInfo.password !== userInfo.verifyPassword) {
        this.setState({ failedSignup: true, errorMessage: 'Passwords must match :)' });
        return
      }
			this.setState({
				signingUp: true
			});
			api.user.signup(userInfo, this.signupResponse);
		}

		signupResponse(user) {
			this.setState({
				signingUp: false
			});
			if (user.status === 'active') {
				localStorage.setItem('email', user.email);
				this.props.loginSuccess(user);
				this.props.history.push('/app');
			} else {
				this.setState({ failedSignup: true });
			}
		}

		handleCancelClick() {
			this.props.history.push('/');
		}

		componentDidMount() {
			let email = localStorage.getItem('email');
			if (email) {
				this.setState({email: email});
			}
		}

    render() {
			return (
				<div className={"loginContainer"}>
					<h1>Baby Steps Signup<span><svg version="1.1" width="25" height="25" x="0px" y="0px"
						viewBox="0 0 424.184 424.184" >
						<path d={ICONS.LOGO1}/>
						<path d={ICONS.LOGO2}/>
					</svg></span></h1>
					{this.state.signingUp &&
						<LinearProgress mode={"indeterminate"} />
					}
					<form onSubmit={this.handleSubmit}>
            <TextField
							hintText="David"
							floatingLabelText="First Name"
							type="firstname"
							fullWidth
							onChange={(event, value)=>{this.handleChange(value, 'firstname')}}
						/>
            <TextField
							hintText="Manchester"
							floatingLabelText="Last Name"
							type="lastname"
							fullWidth
							onChange={(event, value)=>{this.handleChange(value, 'lastname')}}
						/>
						<TextField
							hintText="parent@babysteps.com"
							floatingLabelText="Email"
							type="email"
							fullWidth
							value={this.state.email}
							onChange={(event, value)=>{this.handleChange(value, 'email')}}
						/>
						<TextField
							hintText="super secret password"
							floatingLabelText="Password"
							type="password"
							fullWidth
							onChange={(event, value)=>{this.handleChange(value, 'password')}}							
						/>
            <TextField
							hintText="super secret password"
							floatingLabelText="Verify Password"
							type="password"
							fullWidth
							onChange={(event, value)=>{this.handleChange(value, 'verifyPassword')}}							
						/>
					</form>
					{this.state.failedSignup && 
						<span className={"loginError"}>{this.state.errorMessage}</span>
					}
					<div className="loginFooter">
						<FlatButton label="Cancel" onClick={this.handleCancelClick}/>					
            <FlatButton 
              label="Sign Up!" 
              primary={true}
              onClick={()=>{
                let userInfo = {
                  email: this.state.email,
                  password: this.state.password,
                  verifyPassword: this.state.verifyPassword,
                  firstname: this.state.firstname,
                  lastname: this.state.lastname
                };
                this.handleSignup(userInfo);
              }}/>
					</div>
				</div>
			);
    }
}

export default Signup;