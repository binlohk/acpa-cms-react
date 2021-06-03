import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function RecommendedCourseCard({ title, price, description, courseId, image, index, indexChecking }) {

    return (
        <>
            <div className='max-w-md sm:w-1/2 lg:w-full py-6 px-3'>
                <div className='bg-gray-700 shadow-xl rounded-lg overflow-hidden'>
                    <div className='rounded overflow-hidden'>
                        <img className='w-full h-60 object-contain px-2 py-2' src={image} alt={image} />
                        <div className='h-40 overflow-hidden'>
                            <div className={`px-6`}>
                                <div
                                    className='font-bold text-gray-200 text-lg my-2'>{title}</div>
                                <p
                                    className='text-gray-200 text-sm'>
                                    {
                                        description && description.length > 55 ? (
                                            <>
                                                {description.substring(0, 55) + `...`}
                                            </>
                                        )
                                            : (
                                                description
                                            )
                                    }
                                </p>
                            </div>
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

export default RecommendedCourseCard

