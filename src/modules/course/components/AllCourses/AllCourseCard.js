import React from 'react'
import Button from '../../../utilComponents/Button'
import { Link } from 'react-router-dom';

function AllCourseCard({ title, price, description, courseId, image }) {

    return (
        <>
            <div className="sm:w-1/2 lg:w-1/6 py-6 px-4">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden border-2 border-gray-300">
                    <div className="flex justify-end">
                        <div className='flex items-center bg-yellow-500 w-1/2 h-12 pl-3 rounded-l-lg text-lg'>
                            <span>$ {price} </span>
                        </div>
                    </div>
                    <div className=" object-cover bg-no-repeat bg-center h-24 pt-4"
                        style={{
                            backgroundImage: `url("${image ? image : ''}")`
                        }}>
                    </div>
                    <div className="p-4">
                        <p className="text-lg text-gray-900 pb-2">
                            {title}
                        </p>
                        <div className='pt-2'>
                            <Link to={`/course/${courseId}`}>
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

export default AllCourseCard

