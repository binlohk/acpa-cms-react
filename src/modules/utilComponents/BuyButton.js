import React from 'react'
import { handleBuy } from '../../services/stripe'

const BuyButton = ({ courseId, children }) => {
    return (
            <button onClick={()=>handleBuy(courseId)}>
                {children}
            </button>
    )
}

export default BuyButton;