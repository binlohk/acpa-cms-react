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
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/me`, {
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

    if (token && id !== '' && Component) {
        return (<Route {...rest} render={(props) => (
            <Component {...props} />
        )} />)
    }
    else if (token && id !== '' && props.render) {
        return (<Route {...rest} render={props.render} />)
    }
    else {
        return <Redirect to='/login' />
    }

}




