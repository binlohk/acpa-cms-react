import React from 'react'
import { handleBuy, handleFreeApply } from '../../services/stripe'

const BuyButton = ({ courseId, coursePrice, children }) => {
    return (
        <div>
            {(coursePrice === 0) ?
                (
                    <button
                        style={{ background: '#235789', marginTop: 10 }}
                        onClick={() => handleFreeApply(courseId)} className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700">
                        {children}
                    </button>
                ) : (
                    <button
                        style={{ background: '#235789', marginTop: 10 }}
                        onClick={() => handleBuy(courseId)} className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700">
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