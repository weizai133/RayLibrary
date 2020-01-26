import React,{ Component } from "react";
import { login, logOut } from "../store/reducers/auth";
import { connect } from "react-redux";

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

	loginHandler(){
		this.props.logIn(this.state.email, this.state.password);
	}

	render(){
		return (
			<div>
				<button onClick={()=>this.loginHandler()}>Click</button>
			</div>
		)
	}
}

const mapStateToProps = ({auth}) => {
	return {
		token : auth.token,
		authKey : auth.authKey,
		isLogin : auth.isLogin
	}
}

const mapDispatch = (dispatch) =>{
	return {
		logIn : (email, password) => dispatch(login({email, password})),
		logOut : () => dispatch(logOut()) 
	}
}

export default connect(mapStateToProps, mapDispatch)(LoginPage);