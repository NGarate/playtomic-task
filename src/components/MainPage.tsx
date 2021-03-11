import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Settings from './Settings';
import SignIn from './SignIn';
import ProtectedRoute from './common/ProtectedRoute';

export default function MainPage(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={SignIn} />
                <ProtectedRoute exact path="/" component={Dashboard} />
                <ProtectedRoute path="/settings" component={Settings} />
                <Redirect to="/login" />
            </Switch>
        </Router>
    );
}
