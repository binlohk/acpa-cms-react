import React from 'react'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

function ErrorAlert({ children }) {
    return (
        <div className="mt-4 bg-red-100 border border-red-400 text-sm text-red-700 px-4 py-1 rounded relative" role="alert">
            <PriorityHighIcon />
            <span className="block sm:inline">{children}</span>
        </div>
    )
}

export default ErrorAlert
