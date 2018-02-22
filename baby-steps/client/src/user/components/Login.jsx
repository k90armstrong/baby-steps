import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import styles from './styles/login.css';
import { api } from '../../api';
import { ICONS } from '../../svgs';

class Login extends React.Component {
    constructor() {
			super();
			console.log('ran constructor for login');

			this.state = {
				email: '',
				password: '',
				failedLogin: false,
				loggingIn: false
			};
			
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleCancelClick = this.handleCancelClick.bind(this);			
			this.handleLogin = this.handleLogin.bind(this);
			this.loginResponse = this.loginResponse.bind(this);
		}
		
		handleChange(value, type) {
			this.setState({
				[type]: value
			});
		}

		handleSubmit() {
			console.log(this.state.email, this.state.password);
		}

		handleLogin(email, password) {
			this.setState({
				loggingIn: true
			});
			api.user.login(email, password, this.loginResponse);
		}

		loginResponse(user) {
			this.setState({
				loggingIn: false
			});
			if (user.status === 'active') {
				localStorage.setItem('email', user.email);
				this.props.loginSuccess(user);
				this.props.history.push('/myfamily');
			} else {
				this.setState({ failedLogin: true });
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
					<h1 className={"bottomBorder"}>Baby Steps Login<span><svg version="1.1" width="25" height="25" x="0px" y="0px"
						viewBox="0 0 424.184 424.184" >
						<path d={ICONS.LOGO1}/>
						<path d={ICONS.LOGO2}/>
					</svg></span></h1>
					{this.state.loggingIn &&
						<LinearProgress mode={"indeterminate"} />
					}
					
					<form onSubmit={this.handleSubmit}>
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
					</form>
					{this.state.failedLogin && 
						<span className={"loginError"}>Incorrect email or password! Try Again!</span>
					}
					<div className="loginFooter">
						<FlatButton label="Cancel" onClick={this.handleCancelClick}/>					
						<FlatButton label="Login" primary={true} onClick={()=>this.handleLogin(this.state.email, this.state.password)}/>
					</div>
				</div>
			);
    }
}

export default Login;