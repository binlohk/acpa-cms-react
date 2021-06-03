import React from 'react'

const UserLayoutCenter = ({ children }) => {
    return (
        <>
            <main
                style={{ background: 'linear-gradient(0deg, rgba(81,54,84,1) 0%, rgba(2,0,36,1) 43%, rgba(81,54,84,1) 100%)' }}
                className={`min-h-screen flex justify-center items-center`}>
                {children}
            </main>
        </>
    )
}

export default UserLayoutCenter;