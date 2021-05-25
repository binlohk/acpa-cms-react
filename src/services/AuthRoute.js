import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext'
import { removeToken } from '../services/authService'
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute(props) {
    const token = localStorage.getItem('accessToken')

    const { user, setUser } = useContext(UserContext);

    const {
        component: Component,
        ...rest
    } = props;

    if (token && user.id !== '') {
        return <Redirect to={`/user/${user.id}`} />
    } else {
        return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
    }
}




