import React from 'react'

const UserLayout = ({ children }) => {
    return (
        <>
            <main
                style={{ background: 'linear-gradient(0deg, rgba(81,54,84,1) 0%, rgba(2,0,36,1) 43%, rgba(81,54,84,1) 100%)' }}
                className='min-h-screen'>
                {children}
            </main>
        </>
    )
}

export default UserLayout;