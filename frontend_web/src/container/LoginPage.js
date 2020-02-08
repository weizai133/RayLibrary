import React,{ Component } from "react";
import { login, logOut, authError } from "../store/reducers/auth";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "../css/App.css";

class LoginPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : 'raymond.shan@gmail.com',
			password : 'raymond123'
		}
	}

	componentWillMount(){
		if(this.props.isLogin) this.props.history.push('/home');
	}

	componentDidUpdate(previousProps, nextProps){
		if(previousProps !== nextProps){
			if(this.props.isLogin) this.props.history.push('/home')
		}
	}

	loginHandler=()=>{
		this.props.logIn(this.state.email, this.state.password);
	}

	submitHandler = (e) =>{
		e.preventDefault();
		this.props.logIn(this.state.email, this.state.password);
	}

	render(){
		return (
			<div id="loginForm" className="CentreContainer">
				<span>RayLib</span>
				<Form layout="vertical" onSubmit={(e)=>this.submitHandler(e)}>
					<Input placeholder="Email" onBlur={(e)=>{this.setState({email : e.target.value}); this.props.clearError();} }/>
					<Input.Password placeholder="Password" onBlur={(e)=>{this.setState({password : e.target.value}); this.props.clearError();} }/>
					<div className="loginBtn"><Button type="primary" htmlType="submit">Click</Button></div>
			</Form>
			</div>
		)
	}
}

const mapStateToProps = ({auth}) => {
	return {
		token : auth.token,
		authKey : auth.authKey,
		isLogin : auth.isLogin,
		error : auth.error
	}
}

const mapDispatch = (dispatch) =>{
	return {
		logIn : (email, password) => dispatch(login({email, password})),
		logOut : () => dispatch(logOut()),
		clearError : () => dispatch(authError(null)) 
	}
}

export default connect(mapStateToProps, mapDispatch)(LoginPage);