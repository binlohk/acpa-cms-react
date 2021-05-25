import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext'
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute(props) {
    const token = localStorage.getItem('accessToken')

    const { user } = useContext(UserContext);

    const {
        component: Component,
        ...rest
    } = props;

    if (token && user !== undefined) {
        return <Redirect to={`/user/${user.id}`} />
    } else {
        return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
    }
}




