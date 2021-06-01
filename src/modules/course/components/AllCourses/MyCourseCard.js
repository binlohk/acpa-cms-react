import React from 'react'
import Button from '../../../utilComponents/Button'
import { Link, useLocation } from 'react-router-dom';

function MyCourseCard({ title, price, description, courseId, image }) {
    const location = useLocation()
    console.log()
    return (
        <>
            <div className="max-w-md max-h-full sm:w-1/2 lg:w-1/5 py-6 px-3">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden border-2 border-gray-300">
                    <div className=" object-cover bg-no-repeat bg-center h-56 pt-4"
                        style={{
                            backgroundImage: `url("${image ? image : ''}")`
                        }}>
                    </div>
                    <div className="p-4">
                        <p className="text-3xl text-gray-900 pb-2">
                            名稱：
                            {title}</p>

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

export default MyCourseCard