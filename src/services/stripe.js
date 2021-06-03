import { loadStripe } from '@stripe/stripe-js';
import { httpClient } from './api/axiosHelper'; 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export const handleBuy = async (courseId) => {
    const stripe = await stripePromise;
    const reqObj = {
        courseId
    };
    const session = await httpClient.post(`/user-payments`, reqObj);
    const result = await stripe.redirectToCheckout({sessionId: session.data.sessionID});
}