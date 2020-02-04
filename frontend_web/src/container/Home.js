import React, {useState} from "react";
import { connect } from "react-redux";
import { Switch, Route, NavLink, useRouteMatch, useHistory } from "react-router-dom";
import {store} from "../store";
import { logOut } from "../store/reducers/auth";
import NewBook from "./NewBook";
import BooksList from "./BooksList";
import "../css/home.css";
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const {SubMenu} = Menu;

export default function Home() {

	const {path, url} = useRouteMatch();
	const [collapsed, setCollapsed] = useState(false);
	const history = useHistory();
	
  const toggle = () => {
    // this.setState({
    //   collapsed: !this.state.collapsed,
		// });
		setCollapsed(true);
	};
	
	const logOutHandler = () => {
		// this.props.logOut();
		// this.props.history.push('/')
		store.dispatch(logOut());
		history.push('/');
	}

		return (
			<div>
				<Layout>
					<Sider trigger={null} collapsible collapsed={collapsed}>
						<div className="logo">RayLib</div>
						<Menu
							defaultSelectedKeys={['book1']}
							defaultOpenKeys={['sub1']} 
							theme="dark" mode="inline">
							<SubMenu
								key="sub1"
								title={
									<span>
										<Icon type="book" />
										<span>Book</span>
									</span>
								}
							>
								<Menu.Item key="book1">
									<NavLink to="/home">Books</NavLink>
								</Menu.Item>
								<Menu.Item key="book2">
									<NavLink to="/home/new">New Book</NavLink>
								</Menu.Item>
								<Menu.Item key="book3">Borrow</Menu.Item>
								<Menu.Item key="book4">Purchase</Menu.Item>
							</SubMenu>
							<Menu.Item key="sub2">
								<Icon type="user" />
								<span>Users</span>
							</Menu.Item>
							<Menu.Item key="sub3" onClick={()=>logOutHandler()}>
								<Icon type="upload" />
								<span>Log Out</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Header style={{ background: '#fff', padding: 0 }}>
							<Icon
								className="trigger"
								type={collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={() => toggle()}
							/>
						</Header>
						<Content
							style={{
								margin: '24px 16px',
								padding: 24,
								background: '#fff',
								minHeight: window.innerHeight
							}}
						>
							<Switch>
								<Route exact path={`${path}`} render={()=><BooksList />} />
								<Route path={`${path}/new`} render={()=><NewBook />} />
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
}
