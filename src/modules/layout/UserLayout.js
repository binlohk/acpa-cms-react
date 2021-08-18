import React, { useEffect, useState } from 'react'
import Header from '../layout/header'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const UserLayout = ({ children }) => {

    const [showMobileWarning, setShowMobileWarning] = useState(false)

    useEffect(() => {
        if (window.innerWidth <= 1280)
            setShowMobileWarning(true)
    }, [])

    return (
        <>
            <main
                style={{ background: 'linear-gradient(0deg, rgba(81,54,84,1) 0%, rgba(2,0,36,1) 43%, rgba(81,54,84,1) 100%)' }}
                className={`min-h-screen`}>
                <Header />
                <div className={`pt-24 h-full`}>
                    {children}
                </div>
                <Dialog
                    open={showMobileWarning}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </main>

        </>
    )
}

export default UserLayout;