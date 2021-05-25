import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios'

export default function PrivateRoute(props) {
    const { user, setUser } = useContext(UserContext);
    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        axios.get(`http://localhost:1337/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(loginUser => {
            setUser({
                ...user,
                id: loginUser.data.id,
                email: loginUser.data.email,
                username: loginUser.data.username,
            })
        })
    }, [token])

    const {
        component: Component,
        ...rest
    } = props;

    if (token && user) {
        return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
    } else {
        return <Redirect to='/login' />
    }

}




