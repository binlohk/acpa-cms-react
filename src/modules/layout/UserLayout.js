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

    const [showMobileWarning, setShowMobileWarning] = useState(false)

    const location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        if (window.innerWidth <= 1280 && !pathname.includes("signup") && !pathname.includes("enrollForm"))
            setShowMobileWarning(true)
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
                <Dialog
                    open={showMobileWarning}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"此頁面僅支持電腦用戶"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            手機用戶請下載我們的手機應用程序使用我們的服務
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => window.location.href = 'https://play.google.com/store/apps/details?id=training.acpa.mobile'} color="primary">
                            Android
                        </Button>
                        <Button onClick={(e) => window.location.href = 'https://apps.apple.com/app/%E5%98%89%E6%9E%97%E8%B2%A1%E4%BF%8A/id1578998582/'} color="primary">
                            Apple IOS
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>

        </>
    )
}

export default UserLayout;