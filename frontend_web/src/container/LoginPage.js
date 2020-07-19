import React,{ useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { login, logOut, authError } from "../store/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from 'antd';
import "../css/App.css";

export default function LoginPage(props) {
	const history = useHistory();
	const dispatch = useDispatch();

	const { isLogin, token, authkey, error } = useSelector(state => state.auth)

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if(isLogin) history.push('/home');
	}, [isLogin, history])

	const submitHandler = (e) =>{
		e.preventDefault();
		dispatch(login({ email, password }));
	}

	return (
		<div id="loginForm" className="CentreContainer">
			<span>RayLib</span>
			<Form layout="vertical" onSubmit={(e)=>submitHandler(e)}>
				<Input placeholder="Email" onBlur={(e)=>{setEmail(e.target.value); dispatch(authError(null));} }/>
				<Input.Password placeholder="Password" onBlur={(e)=>{setPassword(e.target.value); dispatch(authError(null))} }/>
				<div className="loginBtn"><Button type="primary" htmlType="submit">Click</Button></div>
		</Form>
		</div>
	)	
}