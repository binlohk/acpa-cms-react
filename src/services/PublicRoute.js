import React from 'react'
import { Route } from 'react-router-dom'
import UserLayout from '../modules/layout/UserLayout'

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            <UserLayout>
                <Component {...props} />
            </UserLayout>
        )} />
    )
}

export default PublicRoute