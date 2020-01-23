import React,{ Component } from "react";
import { fetchBooks } from "../API";
import { login } from "../store/reducers/auth";
import { connect } from "react-redux";
import { setHeader } from "../API";

if(localStorage.authKey && localStorage.token){
	setHeader(localStorage.token, localStorage.authKey);
	try {
		
	} catch (error) {
		
	}
}

class LoginPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : 'raymond.shan@gmail.com',
			password : 'raymond123'
		}
	}
	render(){
		return (
			<div>
			<button onClick={()=>this.props.logIn(this.state.email, this.state.password)}>Click</button>
			<button onClick={()=>fetchBooks()}>Click Me</button>
		</div>
		)
	}
}

const mapStateToProps = ({auth}) => {
	return {
		token : auth.token,
		authKey : auth.authKey,
	}
}

const mapDispatch = (dispatch) =>{
	return {
		logIn : (email, password) => dispatch(login({email, password}))
	}
}

export default connect(mapStateToProps, mapDispatch)(LoginPage);