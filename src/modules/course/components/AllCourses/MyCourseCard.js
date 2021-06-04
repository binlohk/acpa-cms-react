import React from 'react'
import Button from '../../../utilComponents/Button'
import { Link, useLocation } from 'react-router-dom';

function MyCourseCard({ title, courseId, image }) {
    return (
        <>
            <div className='max-w-md sm:w-1/2 lg:w-1/6 py-6 px-3'>
                <div className='bg-gray-700 shadow-xl rounded-lg overflow-hidden'>
                    <div className='rounded overflow-hidden'>
                        <img className='w-full h-60 object-contain px-2 py-2' src={image} alt={image} />
                        <div className='overflow-hidden'>
                            <div className={`px-6`}>
                                <div
                                    className='font-bold text-gray-200 text-lg my-2'>{title}</div>
                            </div>
                        </div>
                        <Link to={`/course/${courseId}`} className='px-6 py-4 bg-gray-600 text-white text-md font-bold flex justify-center items-center'>
                            前往課程
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCourseCard

