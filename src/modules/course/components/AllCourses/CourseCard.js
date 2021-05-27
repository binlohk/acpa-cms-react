import React from 'react'
import Button from '../../../utilComponents/Button'
import { Link } from 'react-router-dom';

function CourseCard({ title, price, description, courseId }) {
    return (
        <>
            <div class="max-w-md w-1/4 max-h-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div class="bg-cover bg-center h-56 pt-4"
                        style={{
                            backgroundImage: `url("https://via.placeholder.com/500")`
                        }}>
                        <div class="flex justify-end">
                            <div className='flex items-center bg-yellow-500 w-1/2 h-8 pl-3 rounded-l-lg text-lg'>
                                <span>$ {price} </span>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <p class="text-3xl text-gray-900">{title}</p>
                        <p class="text-gray-700">{description}</p>
                        <Link>
                            <Button
                                color={'bg-indigo-700'}
                                hoverColor={'bg-blue-dark'}
                                textColor={'text-white'}
                                buttonText={'按此登入'}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseCard
