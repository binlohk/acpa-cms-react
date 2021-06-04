import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { usePromiseTracker } from "react-promise-tracker"

function LoadingSpinner() {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <CircularProgress />
    )
}

export default LoadingSpinner
