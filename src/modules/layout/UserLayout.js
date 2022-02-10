import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../layout/header'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const UserLayout = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
    }, [location.pathname])

    return (
        <>
            <main
                style={{ background: 'linear-gradient(0deg, rgba(81,54,84,1) 0%, rgba(2,0,36,1) 43%, rgba(81,54,84,1) 100%)' }}
                className={`min-h-screen`}>
                <Header />
                <div className={`pt-24 h-full`}>
                    {children}
                </div>
            </main>
        </>
    )
}

export default UserLayout;