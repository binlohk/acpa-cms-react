import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { getUser } from '../services/authService'

export default function AuthRoute(props) {
    const token = localStorage.getItem('accessToken')

    const { id } = getUser()

    const {
        component: Component,
        ...rest
    } = props;

    if (token && id !== '') {
        return <Redirect to={`/user/${id}`} />
    } else {
        return (
            <Route {...rest} render={(props) => (<Component {...props} />)} />
        )
    }
}