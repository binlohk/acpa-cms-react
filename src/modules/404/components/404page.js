
import React from 'react'

const PageNotFound = () => {
    return (
        <>
            <div className="flex-1 min-h-full min-w-full rounded-3xl shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
                <div className="w-full md:w-1/2">
                    <h1 className="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">您要找的頁面不存在</h1>
                    <p className='text-white'>請回到上一頁.</p>
                </div>
            </div>
        </>
    )
}

export default PageNotFound
