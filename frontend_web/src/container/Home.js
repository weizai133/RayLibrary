import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import NewBook from "./NewBook";
import BooksList from "./BooksList";

export default function Home() {
	return (
		<div>
			Home
			<div>
				<Link to="/login">Log In</Link>
			</div>
			<Switch>
				<Route path={`${useRouteMatch().path}`} exact render={()=><BooksList />} />
				<Route path={`${useRouteMatch().path}/new`} render={()=><NewBook />} />
			</Switch>
		</div>
	)
}