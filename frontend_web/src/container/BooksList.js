import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCollections } from "../store/reducers/collection";

function BookList(props) {
	useEffect(()=>{
		props.fetchCollections()
	}, []);

	function mapBooks(){
		return props.listOfCollections.map(val=>(
			<div key={val.collectionId}>{val.collectionName}</div>
		))
	}

	return (
		<div>
			{mapBooks()}	
		</div>
	)

}

const mapStateToProps = ({collection}) => {
	return {
		listOfCollections : collection.collections
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCollections : () => dispatch(fetchCollections())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)