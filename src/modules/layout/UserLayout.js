import React from 'react'
import Header from '../layout/header'
const UserLayout = ({ children }) => {
    return (
        <>
            <main
                style={{ background: 'linear-gradient(0deg, rgba(81,54,84,1) 0%, rgba(2,0,36,1) 43%, rgba(81,54,84,1) 100%)' }}
                className={`min-h-screen`}>
                <Header />
                <div className={`pt-24`}>
                    {children}
                </div>
            </main>
        </>
    )
}

export default UserLayout;