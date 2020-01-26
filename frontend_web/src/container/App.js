import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import LoginPage from "./LoginPage";
import { initUser } from "../store/reducers/auth";
import { store } from "../store";
import withAuth from "./hoc";
import { setHeader } from "../API";

if(window.localStorage.authKey && window.localStorage.token && window.localStorage.userId){
  store.dispatch(initUser({
    data : {
      authKey : window.localStorage.authKey,
      token : window.localStorage.token,
      userId : window.localStorage.userId
    }
  }));
  setHeader(localStorage.token, localStorage.authKey);
}

function App(props) {
  return (
    <div>
      <Switch>
       <Route exact path='/' render={(props)=><LoginPage {...props} />} />
       <Route path='/home' component={withAuth(Home)} />
     </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>{
  return {
    initUser : (payload)=> dispatch(initUser(payload))
  }
}

export default App;
