import React from 'react'
import { Navigate } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = this.props.isAuthenticated;
        console.log(isAuthenticated)
        /* istanbul ignore next */
        return isAuthenticated ? (
            <Component />
        ) : (
            <Navigate to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;