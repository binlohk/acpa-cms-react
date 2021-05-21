import { useState } from 'react';

export default function useAuth() {
    const [user, setUser] = useState(null);
    const storeToken = (token) => {
        localStorage.setItem('accessToken', token)
    }
    const getToken = () => {
        const token = localStorage.getItem('accessToken')
        return token
    }

    return {
        storeToken,
        getToken,
        user,
        setUser,
    }
}