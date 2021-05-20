import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


export default function PrivateRoute(props) {
    // const { user } = useContext(UserContext);

    const user = localStorage.getItem('auth')
    console.log(user);

    const {
        component: Component,
        ...rest
    } = props;

    if (user) {
        return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
    } else {
        return <Redirect to='/login' />
    }

}




