import React, {useEffect} from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/reducers/user";

function Users(props) {

	useEffect(() => {
		props.fetchUsers('ALL')
	}, [])
	
	const mapUsers = () => (
		props.users.map(val=> (
		<div key={val.userId}>{val.userName}</div>
		))
	)
	

	return (
		<div>
			{mapUsers()}
		</div>
	)
	
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