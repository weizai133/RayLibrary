import React,{ Component } from "react";
import { login, logOut } from "../store/reducers/auth";
import { fetchBooks } from "../store/reducers/book";
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
				<button onClick={()=>this.props.logOut()}>Log Out</button>
				<button onClick={()=>this.props.logIn(this.state.email, this.state.password)}>Click</button>
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
		logIn : (email, password) => dispatch(login({email, password})),
		logOut : () => dispatch(logOut()),
		fetchBooks : () => dispatch(fetchBooks())
	}
}

export default connect(mapStateToProps, mapDispatch)(LoginPage);