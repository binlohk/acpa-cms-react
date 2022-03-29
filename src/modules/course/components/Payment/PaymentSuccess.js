import React, { useEffect, useState } from 'react'
import {
    Link
} from "react-router-dom";
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';
import { httpClient } from '../../../../services/api/axiosHelper'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import PageNotFound from '../../../404/components/404page'

function PaymentSuccess(props) {
    const params = props.match.params;
    const { search } = useLocation();
    const { session_id } = queryString.parse(search);
    const [data, setData] = useState(null);
    const [ifSessionIdValid, setIfSessionIdValid] = useState(false);
    const fetchPaidCourse = async () => {
        try {
            await httpClient.get(`/user-payments/${session_id}`);
            setIfSessionIdValid(true);
        } catch (e) {
            setIfSessionIdValid(false);
        }
        const result = await httpClient.get(`${process.env.REACT_APP_BACKEND_SERVER}/courses/${params.courseId}`);
        setData(result.data);
    }

    useEffect(() => {
        fetchPaidCourse();
    }, [])
    if (ifSessionIdValid) {
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
                                    <div className="text-md font-semibold text-gray-600">您已成功購買此課程: </div>
                                    {data && <div className="text-md font-semibold text-gray-600">{data.title}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex justify-center">
                        <Link to={`/course/${params.courseId}`}>
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
    } else {
        return (
            <PageNotFound />
        )
    }
}

export default PaymentSuccess
