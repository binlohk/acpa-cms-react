import React from 'react'

function Button({ color, textColor, hoverColor, buttonText, onClickMethod, borderRadius }) {
    return (
        <div class="flex items-center justify-between">
            <button
                onClick={onClickMethod}
                className={`${color} ${textColor} hover:${hoverColor} ${borderRadius} font-bold w-full h-12 py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="submit">
                {buttonText}
            </button>
        </div>
    )
}

export default Button
