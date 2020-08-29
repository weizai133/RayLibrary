import React from "react";
import Menu from "../Component/Menu"
import Routes from "./Routes";

export default (props) => {
  return (
    <Menu {...props}>
      <Routes {...props} />
    </Menu>
  )
}