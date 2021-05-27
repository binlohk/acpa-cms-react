import React from 'react'

function Button({ color, textColor, hoverColor, buttonText, onClickMethod, borderRadius, children, disabled }) {
    return (
        <div className="flex items-center justify-between">
            <button
                onClick={onClickMethod}
                className={`${color ? color : 'bg-indigo-700'} ${textColor ? textColor : 'text-white'} hover:${hoverColor ? hoverColor : 'bg-blue-dark'} ${borderRadius ? borderRadius : null} font-bold w-full h-12 py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="submit" disabled={disabled}>
                {children ? children:"button text"}
            </button>
        </div>
    )
}

export default Button
