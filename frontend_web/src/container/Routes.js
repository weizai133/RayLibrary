import React, { lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import store from "../store";

export default () => {
  const { path } = useRouteMatch()

  /**
   * @param componentName is a String
   * @param reducers is an Array of containing all of needed reducers for the component
   */
  const AsyncComponent = (componentName, reducers = null) => {
    const RenderComponent = lazy(async () => {
      try {
        if (reducers) {
          const importedReducers = await Promise.all(reducers.map(val => import(`../store/reducers/${val}`)));
          importedReducers.forEach((val, index) => store.injectReducer(reducers[index], val.default));
        }
        const element = await import(`./${componentName}`);
        return element;
      } catch (error) {
        console.log(error);
      }
    })
    return (
      <div>
        <Suspense fallback={<div>loading</div>}>
          <RenderComponent />
        </Suspense>
      </div>
    )
  }

  return (
    <Switch>
      <Route exact path={`${path}`} render={()=> AsyncComponent('BooksList', ['collection'])} />
      <Route path={`${path}/newBook`} render={()=> AsyncComponent('NewBook', ['book', 'collection'])} />
      <Route path={`${path}/user`} render={()=> AsyncComponent('Users', ['user'])}/>
      <Route path={`${path}/purchase`} render={()=> AsyncComponent('PurchasePage')} />
    </Switch>
  )
}

