import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Parser} from 'html-to-react';
import DOMPurify from 'dompurify';
var currencyFormatter = require('currency-formatter');

function RecommendedCourseCard({ title, price, description, courseId, image, index, indexChecking }) {

    return (
        <>
            <div className='max-w-md px-3 py-6 md:w-1/1 lg:w-full'>
                <div className='overflow-hidden bg-gray-700 rounded-lg shadow-xl'>
                    <Link to={`/course/${courseId}`}>
                        <div className='overflow-hidden rounded'>
                            <img className='object-contain w-full px-2 py-2 h-60' src={image} alt={image} />
                            <div className='h-40 overflow-hidden'>
                                <div className={`px-6`}>
                                    <div
                                        className='my-2 text-lg font-bold text-gray-200'>{title}</div>
                                    <p
                                        className='text-sm text-gray-200'>
                                        {
                                            description && description.length > 55 ? (
                                                <>
                                                {Parser().parse(DOMPurify.sanitize(description.substring(0, 55) + `...`))}
                                                </>
                                            )
                                                : (
                                                    <>
                                                    {Parser().parse(DOMPurify.sanitize(description))}
                                                    </>
                                                    
                                                )
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-center px-6 py-4 text-xl font-bold text-white bg-gray-600'>
                                {price == 0 ?
                                    <>
                                        Free
                                    </>
                                    :
                                    <>
                                        {currencyFormatter.format(price, { code: 'HKD' })}
                                    </>

                                }
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default RecommendedCourseCard


