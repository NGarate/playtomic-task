import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProtectedRouteProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType;
}

export default function ProtectedRoute({
    exact,
    path,
    component
}: ProtectedRouteProps): JSX.Element {
    const { isAuthenticated } = useSelector((state: RootState) => state.login);

    return isAuthenticated ? (
        <Route exact={exact} path={path} component={component} />
    ) : (
        <Redirect to="/login" />
    );
}
