import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

export default function withAuth(NextComponent) {
	function Authenticate(props){

		const history = useHistory()

		useEffect(()=>{
			if(!props.isLogin || !props.token || !props.authKey || !props.userId){
				history.push('/');
			}
		}, [props.isLogin, props.token, props.authKey, props.userId, history])

		return (
			<NextComponent {...props} />
		)
		
	}

	const mapStateToProps = ({auth}) => {
		return {...auth}
	}
	return connect(mapStateToProps)(Authenticate);
}