import React from 'react'
import Button from '../../../utilComponents/Button'
import { Link } from 'react-router-dom';

function CourseCard({ title, price, description, courseId, image }) {
    return (
        <>
            <div className="max-w-md w-1/4 max-h-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-cover bg-center h-56 pt-4"
                        style={{
                            backgroundImage: `url("${image}")`
                        }}>
                        <div className="flex justify-end">
                            <div className='flex items-center bg-yellow-500 w-1/2 h-12 pl-3 rounded-l-lg text-lg'>
                                <span>$ {price} </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-3xl text-gray-900">{title}</p>
                        <p className="text-gray-700">{description}</p>
                        <div className='pt-4'>
                            <Link>
                                <Button
                                    color={'bg-gray-700'}
                                    hoverColor={'bg-blue-dark'}
                                    textColor={'text-white'}
                                    borderRadius={'rounded-2xl'}
                                >
                                    進入課程
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseCard
