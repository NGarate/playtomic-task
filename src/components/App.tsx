import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Settings from './Settings';

export default function MyApp() { 
  return (
    <>
      <CssBaseline />
      <SignIn>
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/settings" component={Settings} />
        </Switch>
        </BrowserRouter>
      </SignIn>
  </>
  )
};
