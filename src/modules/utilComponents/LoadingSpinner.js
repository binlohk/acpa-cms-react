import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { usePromiseTracker } from "react-promise-tracker"

function LoadingSpinner() {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <>
            <div className='flex items-center justify-center'>
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold ml-4">Loading...</h2>
            </div>
        </>
    )
}

export default LoadingSpinner
