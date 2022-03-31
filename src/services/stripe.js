import { loadStripe } from '@stripe/stripe-js';
import { httpClient } from './api/axiosHelper';
import { getUser } from '../services/authService';

export const handleBuy = async (courseId) => {
    const user = getUser();
    if (user.id != "" && user.id != null) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK);
        const reqObj = {
            courseId
        };
        try {
            const session = await httpClient.post(`/user-payments`, reqObj);
            const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionID });
        } catch (err){
            alert(err.response.data.message);
        }
    } else {
        window.location.href = '/login'
    }
}

export const handleFreeApply = async (courseId) => {
    const user = getUser();
    if (user.id != "" && user.id != null) {
        const reqObj = {
            courseId
        };
        await httpClient.post('/user-payments', reqObj);
        window.location.href = '/my-courses'
    } else {
        window.location.href = '/login'
    }
}