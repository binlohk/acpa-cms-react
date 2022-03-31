import React from 'react'
import { handleBuy, handleFreeApply } from '../../services/stripe'

const BuyButton = ({ courseId, coursePrice, children, setIsLoading, isDisabled }) => {
    console.log("setIsLoading in buy button",setIsLoading);
    return (
        <div>
            {(coursePrice === 0) ?
                (
                    <button
                    style={isDisabled ? { background:  '#cccccc', color: 'black', marginTop: 10 } :{ background:  '#235789', marginTop: 10 } }
                        onClick={() => {handleFreeApply(courseId); setIsLoading(true);}} className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700">
                        {children}
                    </button>
                ) : (
                    <button
                        disabled={isDisabled}
                        style={isDisabled ? { background:  '#cccccc', color: 'black', marginTop: 10 } :{ background:  '#235789', marginTop: 10 } }
                        onClick={() => { handleBuy(courseId); setIsLoading(true);}} className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700">
                        
                        {children}
                    </button>
                )
            }
        </div>
    )
}

BuyButton.defaultProps = {
    coursePrice: 0
}

export default BuyButton;