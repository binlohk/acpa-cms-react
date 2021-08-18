import React, { useEffect, useState } from 'react'
import Header from '../layout/header'
const UserLayout = ({ children }) => {

    const [showMobileWarning, setShowMobileWarning] = useState(false)

    useEffect(() => {
        if (window.innerWidth <= 800)
            setShowMobileWarning(true)
    }, [])

    return (
        <>
            {
                showMobileWarning === true ? (
                    <div className="relative items-center flex-1 min-w-full min-h-full p-10 text-center text-gray-800 shadow-xl rounded-3xl lg:p-20 md:flex md:text-left">
                        <div className="w-full md:w-1/2">
                            <h1 className="mb-10 text-3xl font-black text-yellow-500 lg:text-5xl">您要找的頁面不存在</h1>
                            <p className='text-white'>請回到上一頁</p>
                        </div>
                    </div>
                ) : (
                    <main
                        style={{ background: 'linear-gradient(0deg, rgba(81,54,84,1) 0%, rgba(2,0,36,1) 43%, rgba(81,54,84,1) 100%)' }}
                        className={`min-h-screen`}>
                        <Header />
                        <div className={`pt-24 h-full`}>
                            {children}
                        </div>
                    </main>
                )
            }
        </>
    )
}

export default UserLayout;