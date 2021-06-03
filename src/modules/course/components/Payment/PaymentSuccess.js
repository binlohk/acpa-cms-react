import React, { useEffect, useState } from 'react'
import {
    Link
} from "react-router-dom";
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';
import { httpClient } from '../../../../services/api/axiosHelper'

function PaymentSuccess() {
    const [slug, setSlug] = useState(null)
    const [data, setData] = useState(null)
    const fetchPaidCourse = async () => {
        const newSlug = window.location.pathname.substring(17)
        setSlug(newSlug)
        const result = await httpClient.get(`http://localhost:1337/courses`, { params: { id: window.location.pathname.substring(17) } })
        setData(result.data[0].title)
        console.log(result.data[0].title, 'fetchPaidCourse')
    }

    useEffect(() => {
        fetchPaidCourse()
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
                                <CheckIcon />
                            </Avatar>
                            <div className="ml-2">
                                <div className="text-md font-semibold text-gray-600">您已成功購買此課程:{data}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 flex justify-center">
                    <Link to={`/course/${slug}`}>
                        <button
                            style={{ backgroundColor: '#A5924B' }}
                            className="p-4 hover:bg-green-500 w-full rounded-lg shadow text-xl font-medium uppercase text-white">
                            前往課程
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess
