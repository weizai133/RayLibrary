import React,{ useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { login, logOut, authError } from "../store/reducers/auth";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "../css/App.css";

function LoginPage(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	useEffect(() => {
		if(props.isLogin) history.push('/home');
	}, [props.isLogin, history])

	const loginHandler=()=>{
		props.logIn(this.state.email, this.state.password);
	}

	const submitHandler = (e) =>{
		e.preventDefault();
		props.logIn(email, password);
	}

		return (
			<div id="loginForm" className="CentreContainer">
				<span>RayLib</span>
				<Form layout="vertical" onSubmit={(e)=>submitHandler(e)}>
					<Input placeholder="Email" onBlur={(e)=>{setEmail(e.target.value); props.clearError();} }/>
					<Input.Password placeholder="Password" onBlur={(e)=>{setPassword(e.target.value); props.clearError();} }/>
					<div className="loginBtn"><Button type="primary" htmlType="submit">Click</Button></div>
			</Form>
			</div>
		)
	
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