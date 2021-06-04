import React from 'react'
import SearchBar from '../../../utilComponents/SearchBar'

function AllCoursesIntro({ numberOfCourses, onSearchChange }) {
    return (
        <div className='flex justify-center items-start py-24'>
            <div className='pr-8'>
                <div className='text-white text-4xl pb-4'>
                    我們致力提供優質的金融課程
                </div>
                <div className='w-full'>
                    <SearchBar onSearchChange={onSearchChange} />
                </div>
            </div>
            {/* {
                    numberOfCourses === 0 && ( */}
            <span>

                {/* )
                } */}
                {
                    numberOfCourses > 0 && (
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-white text-xl'>
                                課程數目
                            </div>
                            <div
                                style={{ borderColor: '#A5924B' }}
                                className='text-gray-200 text-4xl font-bold border-4 rounded-full h-24 w-24 flex items-center justify-center'>
                                {numberOfCourses}
                            </div>
                        </div>
                    )
                }
            </span>
        </div>
    )
}

export default AllCoursesIntro
