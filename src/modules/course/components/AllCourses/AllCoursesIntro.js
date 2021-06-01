import React from 'react'

function AllCoursesIntro({ numberOfCourses }) {
    return (
        <div className='flex'>
            <div className='flex flex-col justify-center items-center flex-1 text-center'>
                <div className='text-white text-4xl pb-4'>
                    我們致力提供優質的金融課程
                </div>
                {
                    numberOfCourses > 0 && (
                        <>
                            <div className='text-white text-xl pb-4'>
                                課程數目
                            </div>
                            <div
                                style={{ borderColor: '#A5924B' }}
                                className='text-gray-200 text-4xl font-bold border-4 rounded-full h-24 w-24 flex items-center justify-center'>
                                {numberOfCourses}
                            </div>
                        </>
                    )
                }
            </div>
            <div className='h-full w-1/2'>
                <img className='object-cover' src='/allCoursesIntro.jpg' />
            </div>
        </div>
    )
}

export default AllCoursesIntro
