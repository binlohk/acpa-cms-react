import { useState } from 'react'
import { UserContext } from './UserContext'
import { storeToken } from '../services/authService'

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ id: '', email: '', username: '' });

    return (
        <UserContext.Provider value={{ user, setUser, storeToken }}>
            {children}
        </UserContext.Provider>
    );
}