import { useState } from 'react';

export default function useAuth() {
    const [user, setUser] = useState({ id: '', email: '', username: '' });
    

    return {
        user,
        setUser,
    }
}