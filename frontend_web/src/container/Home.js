import React, {useState} from "react";
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import {store} from "../store";
import { logOut } from "../store/reducers/auth";
import NewBook from "./NewBook";
import BooksList from "./BooksList";
import PurchasePage from "./PurchasePage";
import UserPage from "./Users";
import "../css/home.css";
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const {SubMenu} = Menu;

export default function Home() {

	const history = useHistory();
	const {path} = useRouteMatch();
	const [collapsed, setCollapsed] = useState(false);
	const [nav, SetNav] = useState(path);
	const [subNav, setSubNav] = useState(history.location.pathname);

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
							defaultOpenKeys={[nav]} 
							defaultSelectedKeys={[subNav]}
							theme="dark" mode="inline">
							<SubMenu
								key="/home"
								title={
									<span>
										<Icon type="book" />
										<span>Book</span>
									</span>
								}
							>
								<Menu.Item key="/home">
									<Link to="/home">Books</Link>
								</Menu.Item>
								<Menu.Item key="/home/newBook">
									<Link to="/home/newBook">New Book</Link>
								</Menu.Item>
								<Menu.Item key="/home/borrow">Borrow</Menu.Item>
								<Menu.Item key="/home/purchase">
									<Link to="/home/purchase">Purchase</Link>
								</Menu.Item>
							</SubMenu>
							<Menu.Item key="/home/user">
								<Link to="/home/user">
									<Icon type="user" />
									<span>Users</span>
								</Link>
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
								<Route path={`${path}/newBook`} render={()=><NewBook />} />
								<Route path={`${path}/user`} render={()=><UserPage />}/>
								<Route path={`${path}/purchase`} render={()=><PurchasePage />} />
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</div>
		)
}
