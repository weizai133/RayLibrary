import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(NextComponent) {
	class Authenticate extends Component{
		componentWillMount(){
			if(!this.props.isLogin || !this.props.token || !this.props.authKey || !this.props.userId){
				this.props.history.push('/');
			}
		}

		componentWillUpdate(nextProps){
			if(!nextProps.isLogin || !nextProps.token || !nextProps.authKey || !nextProps.userId){
				this.props.history.push('/');
			}
		}

		render(){
			return (
				<NextComponent {...this.props} />
			)
		}
	}

	const mapStateToProps = ({auth}) => {
		return {...auth}
	}
	return connect(mapStateToProps)(Authenticate);
}