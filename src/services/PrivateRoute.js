import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios'
import { getUser, storeUser } from '../services/authService'
import UserLayout from '../modules/layout/UserLayout'

export default function PrivateRoute(props) {
    const token = localStorage.getItem('accessToken')
    const { id } = getUser()
    useEffect(() => {
        axios.get(`http://localhost:1337/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(loginUser => {
            storeUser(loginUser.data)
        })
    }, [])

    const {
        component: Component,
        ...rest
    } = props;

    if (token && id !== '') {
        return (<Route {...rest} render={(props) => (
            <Component {...props} />
        )} />

        )
    } else {
        return <Redirect to='/login' />
    }

}




