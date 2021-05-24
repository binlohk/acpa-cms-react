import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from '../../../../hooks/useAuth'
import jwt from 'jsonwebtoken';

function UserProfile({ user }) {
    const { getToken, storeToken, setUser } = useAuth()

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const token = getToken()
                const decodedPayload = jwt.decode(token);
                const currentTime = Date.now() / 1000
                if (decodedPayload.exp === currentTime) {
                    const response = await axios.post(`http://localhost:1337/users-permissions/refreshToken`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    storeToken(response.data.jwt)
                    const user = await axios.get(`http://localhost:1337/users/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    setUser(user)
                    console.log(user.data, 'user', response.data, 'data')
                }
                const user = await axios.get(`http://localhost:1337/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(user.data, 'user')

            } catch (e) {
                console.log(e)
            }
        }
        fetchUserData()
    }, [])
    return (
        <div>
            User profile
        </div>
    )
}

export default UserProfile
