import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCollections } from "../store/reducers/collection";

export default function BookList(props) {
	const dispatch = useDispatch()
	const listOfCollections = useSelector(state => state.collection.collections)

	useEffect(()=>{
		dispatch(fetchCollections())
	}, []);

	function mapBooks(){
		return listOfCollections.map(val=>(
			<div key={val.collectionId}>{val.collectionName}</div>
		))
	}

	return (
		<div>
			{mapBooks()}	
		</div>
	)

}
