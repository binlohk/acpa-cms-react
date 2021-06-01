import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext'
import { Route, Redirect } from 'react-router-dom'
import { getUser } from '../services/authService'
import UserLayout from '../modules/layout/UserLayout';

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
            <UserLayout>
                <Route {...rest} render={(props) => (<Component {...props} />)} />
            </UserLayout>
        )
    }
}




