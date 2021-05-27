import React from 'react'

function CourseTitle({ children }) {
    return (
        <>
            <div className='text-4xl font-bold my-4 pl-12 pt-4 text-gray-600'>{children}</div>
            <div class="text-start">
                <span class="inline-block w-full h-1 rounded-full bg-gray-500 px-4 ml-1"></span>
            </div>
        </>
    )
}

export default CourseTitle
