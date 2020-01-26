import React from "react";
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

export default function NavigationMenu(){

	return (
		<Menu
		style={{ width: 1/5*window.innerWidth, height : window.innerHeight }}
		defaultSelectedKeys={['1']}
		defaultOpenKeys={['sub1']}
		mode="inline"
	>
		<SubMenu
			key="sub1"
			title={
				<span>
					<Icon type="mail" />
					<span>Books</span>
				</span>
			}
		>
			<Menu.Item key="1">Purchase</Menu.Item>
			<Menu.Item key="2">Borrow</Menu.Item>
			<Menu.Item key="3">Create Books</Menu.Item>
		</SubMenu>
		<SubMenu
			key="sub2"
			title={
				<span>
					<Icon type="appstore" />
					<span>Users</span>
				</span>
			}
		>
			<Menu.Item key="5">Option 5</Menu.Item>
			<Menu.Item key="6">Option 6</Menu.Item>
			<SubMenu key="sub3" title="Submenu">
				<Menu.Item key="7">Option 7</Menu.Item>
				<Menu.Item key="8">Option 8</Menu.Item>
			</SubMenu>
		</SubMenu>
	</Menu>
	)
}