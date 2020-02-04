import React, {Component} from "react";
import { connect } from "react-redux";
import { Switch, Route, NavLink } from "react-router-dom";
import { logOut } from "../store/reducers/auth";
import NewBook from "./NewBook";
import BooksList from "./BooksList";
import "../css/home.css";
// import Menu from "../components/Menu";
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const {SubMenu} = Menu;

class Home extends Component {

  state = {
    collapsed: false,
  };
	
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
	};
	
	logOutHandler = () => {
		this.props.logOut();
		this.props.history.push('/')
	}

	goToNew = () => {
		
	}

	render(){
		console.log(this.props.history.location.pathname)
		return (
			<div>
				<Layout>
					<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
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
							<Menu.Item key="sub3" onClick={()=>this.logOutHandler()}>
								<Icon type="upload" />
								<span>Log Out</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Header style={{ background: '#fff', padding: 0 }}>
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
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
								<Route path={`${this.props.history.location.pathname}`} exact render={()=><BooksList />} />
								<Route path={`${this.props.history.location.pathname}/new`} exact render={()=><NewBook />} />
							</Switch>
						</Content>
					</Layout>
				</Layout>
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