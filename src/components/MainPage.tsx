import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { checkAuth0Status } from '../store/loginReducer';
import Dashboard from './Dashboard';
import Settings from './Settings';
import SignIn from './SignIn';
import ProtectedRoute from './common/ProtectedRoute';

export default function MainPage(): JSX.Element {
    const auth0 = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth0Status(auth0));
    });

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
