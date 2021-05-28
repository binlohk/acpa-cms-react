import React from 'react'
import Button from '../../../utilComponents/Button'
import { Link } from 'react-router-dom';

function RecommendedCourseCard({ title, price, description, courseId, image, index, indexChecking }) {

    return (
        <>
            <div className='max-w-md max-h-full sm:w-1/2 lg:w-1/5 py-6 px-3'>
                <div className='bg-gray-700 shadow-xl rounded-lg overflow-hidden'>
                    <div className='rounded overflow-hidden'>
                        <img className='w-full px-5 py-8' src={image} alt='Mountain' />
                        <div className='h-2/3 overflow-hidden'>
                            <div className={`px-6 h-60`}>
                                <div className='font-bold text-gray-200 text-3xl px-2 mb-2'>{title}</div>
                                <p className='text-gray-200 text-base h-4/5 overflow-y-scroll px-2'>
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className='px-6 pt-2 flex justify-center items-center'>
                            <span className='inline-block bg-gray-200 rounded-full px-3  text-lg font-semibold text-gray-700 mr-2 mb-2'>$ {price} </span>
                        </div>
                        <Link to={`/course/${courseId}`}>
                            <div className='px-6 pb-2'>
                                <Button
                                    color={'bg-gray-700'}
                                    hoverColor={'bg-blue-dark'}
                                    textColor={'text-white'}
                                    borderRadius={'rounded-2xl'}
                                >
                                    進入課程
                            </Button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendedCourseCard

