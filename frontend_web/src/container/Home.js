import React, {Component} from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import { logOut } from "../store/reducers/auth";
import NewBook from "./NewBook";
import BooksList from "./BooksList";
import Menu from "../components/Menu";


class Home extends Component {

	state = {
		current : 'email'
	}
	
	LogOutHandler = () =>{
		this.props.logOut();
		this.props.history.push('/')
	}

	onChange = (date, dateString) => {
		console.log(date, dateString);
	}

	render(){
		return (
			<div>
				<Menu />
				<Switch>
					<Route path={`${this.props.history.location.pathname}`} exact render={()=><BooksList />} />
					<Route path={`${this.props.history.location.pathnam}/new`} render={()=><NewBook />} />
				</Switch>
			</div>
		)
	}
	
}

const mapStateToProps = () =>{
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logOut : ()=> dispatch(logOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);