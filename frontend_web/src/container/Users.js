import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/reducers/user";

export default function Users(props) {
	const dispatch = useDispatch()
	const users = useSelector(state => state.user.users)

	useEffect(() => {
		dispatch(fetchUsers('ALL'))
	}, [])
	
	const mapUsers = () => (
		users.map(val=> (
		<div key={val.userId}>{val.userName}</div>
		))
	)

	return (
		<div>
			{mapUsers()}
		</div>
	)
	
}