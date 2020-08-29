import React from 'react';
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import LoginPage from "./LoginPage";
import { initUser } from "../store/reducers/auth";
import { store } from "../store";
import AuthHOC from "../HOC/AuthHOC";
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
       <Route path='/home' component={AuthHOC(Main)} />
     </Switch>
    </div>
  );
}

export default App;
