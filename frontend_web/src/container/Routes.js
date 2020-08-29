import React, { lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default () => {
  const { path } = useRouteMatch()

  /**
   * @param componentName is a String
   */
  const AsyncComponent = (componentName) => {
    const RenderComponent = lazy(() => import(`./${componentName}`))
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
      <Route exact path={`${path}`} render={()=> AsyncComponent('BooksList')} />
      <Route path={`${path}/newBook`} render={()=> AsyncComponent('NewBook')} />
      <Route path={`${path}/user`} render={()=> AsyncComponent('Users')}/>
      <Route path={`${path}/purchase`} render={()=> AsyncComponent('PurchasePage')} />
    </Switch>
  )
}

