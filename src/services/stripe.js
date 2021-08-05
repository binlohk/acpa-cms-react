import { loadStripe } from '@stripe/stripe-js';
import { httpClient } from './api/axiosHelper';
import { getUser } from '../services/authService';

const stripePromise = loadStripe(`${process.env.ACPA_REACT_APP_STRIPE_PK}`);

export const handleBuy = async (courseId) => {
    const user = getUser();
    if (user.id != "" && user.id != null) {
        const stripe = await stripePromise;
        const reqObj = {
            courseId
        };
        const session = await httpClient.post(`/user-payments`, reqObj);
        const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionID });
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
        console.log(reqObj);
        const session = await httpClient.post('/user-payments', reqObj);
        window.location.href = '/my-courses'
    } else {
        window.location.href = '/login'
    }
}