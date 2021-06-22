
import React from 'react'

const PageNotFound = () => {
    return (
        <>
            <div className="relative items-center flex-1 min-w-full min-h-full p-10 text-center text-gray-800 shadow-xl rounded-3xl lg:p-20 md:flex md:text-left">
                <div className="w-full md:w-1/2">
                    <h1 className="mb-10 text-3xl font-black text-yellow-500 lg:text-5xl">您要找的頁面不存在</h1>
                    <p className='text-white'>請回到上一頁</p>
                </div>
            </div>
        </>
    )
}

export default PageNotFound
