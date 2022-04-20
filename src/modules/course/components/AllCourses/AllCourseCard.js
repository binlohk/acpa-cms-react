import React from 'react'
import { Link } from 'react-router-dom';

var currencyFormatter = require('currency-formatter');

function AllCourseCard({ title, price, description, courseId, image, filteredCourseLength }) {

    return (
        <>
            <div className='max-w-md px-3 py-6 w-full md:w-1/2 lg:w-1/6'>
                <div className='overflow-hidden bg-gray-700 rounded-lg shadow-xl'>
                    <Link to={`/course/${courseId}`}>
                        <div className='overflow-hidden rounded'>
                            <img className='object-contain w-full px-2 h-60' src={image} alt={image} />
                            <div className={`px-6`}>
                                <div
                                    className='h-20 font-bold text-gray-200 text-md'>{title}</div>
                                {filteredCourseLength > 0 && (
                                    <p className='pb-8 text-sm text-gray-200'>
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
                                )}
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

export default AllCourseCard


