import { loadStripe } from '@stripe/stripe-js';
import { httpClient } from './api/axiosHelper';
import { getUser } from '../services/authService';

const stripePromise = loadStripe((process.env.ACPA_REACT_APP_STRIPE_PK).toString());

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