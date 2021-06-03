import React, { useState, useEffect } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import {
    Link
} from "react-router-dom";
import ClearIcon from '@material-ui/icons/Clear';
import Avatar from '@material-ui/core/Avatar';

function PaymentFailure() {
    const [slug, setSlug] = useState(null)
    const [title, setTitle] = useState(null)
    const fetchCourse = async () => {
        const newSlug = window.location.pathname.substring(17)
        setSlug(newSlug)
        const result = await httpClient.get(`http://localhost:1337/courses`, { params: { id: window.location.pathname.substring(17) } })
        setTitle(result.data[0].title)
        console.log(result.data[0].title, 'fetchPaidCourse')
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    return (
        <div className='p-24'>
            <div className="m-auto bg-white w-full md:max-w-4xl rounded-lg shadow">
                <div className="h-12 flex justify-center items-center border-b border-gray-200">
                </div>
                <div className="px-6">
                    <div className="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                        <div className="flex items-center">
                            <Avatar alt="Remy Sharp" className="rounded-full h-12 w-12" >
                                <ClearIcon
                                    color='error'
                                />
                            </Avatar>
                            <div className="ml-2">
                                <div className="text-md font-semibold text-gray-600">您尚未購買此課程:{title} </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 flex justify-center">
                    <Link to={`/course/${slug}`}>
                        <button
                            style={{ backgroundColor: '#A5924B' }}
                            className="p-4 hover:bg-green-500 rounded-lg shadow text-xl uppercase text-white">
                            重新購買
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentFailure
