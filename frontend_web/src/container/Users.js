import React,  {Component} from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/reducers/user";

class Users extends Component {

	componentDidMount(){
		this.props.fetchUsers('ALL')
	}

	mapUsers = () => (
		this.props.users.map(val=> (
		<div key={val.userId}>{val.userName}</div>
		))
	)
	
	render(){
		return (
			<div>
				{this.mapUsers()}
			</div>
		)
	}
}

const mapStateToProps = ({user}) => {
	return {
		users : user.users
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers : (type)=> dispatch(fetchUsers(type))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);