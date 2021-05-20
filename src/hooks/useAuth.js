import { useState } from 'react';

export default function useAuth() {
    const [user, setUser] = useState(null);
    const storeToken = (token) => {
        localStorage.setItem('auth', token)
    }
    return {
        storeToken,
        user,
        setUser,
    }
}