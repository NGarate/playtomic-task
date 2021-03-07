import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Settings from './Settings';

export default function MainPage() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </BrowserRouter>
    );
}
