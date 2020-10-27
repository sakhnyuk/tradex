import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Explore from '../routes/Explore/Explore';

export const Router = () => {

  return <Switch>
    <Route exact path="/" component={Explore}/>
    {/* <Route path="/settings" component={Settings} /> */}
  </Switch>;
};
