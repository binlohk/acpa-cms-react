import React from 'react'
import { Link } from 'react-router-dom';

function AllCourseCard({ title, price, description, courseId, image }) {

    return (
        <>
            <div className='max-w-md sm:w-1/2 lg:w-1/6 py-6 px-3'>
                <div className='bg-gray-700 shadow-xl rounded-lg overflow-hidden'>
                    <div className='rounded overflow-hidden'>
                        <img className='w-full h-60 object-contain px-2 py-2' src={image} alt={image} />
                        <div className={`px-6`}>
                            <div
                                className='font-bold h-20 text-gray-200 text-md'>{title}</div>
                        </div>
                        <Link to={`/course/${courseId}`}>
                            <div className='px-6 py-4 bg-gray-600 text-white text-xl font-bold flex justify-center items-center'>
                                $ {price}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllCourseCard

