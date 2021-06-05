import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from './../../Auth/LoginScreen/index';
import RegisterScreen from './../../Auth/RegisterScreen/index';

const GuestRoot: React.FC = () => (
  <Switch>
    <Route exact path="/login" component={LoginScreen} />
    <Route exact path="/register" component={RegisterScreen} />
    <Route path="*" component={() => <Redirect to="/login" />} />
  </Switch>
);

export default GuestRoot;
