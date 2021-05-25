import axios from 'axios'
import { httpClient } from '../../../../services/api/axiosHelper'
import React, { useEffect } from 'react'
import useAuth from '../../../../hooks/useAuth'
import jwt from 'jsonwebtoken';
import { storeToken, getToken, removeToken } from '../../../../services/authService'
import { Popover } from '@headlessui/react'

function UserProfile() {
    const { user, setUser } = useAuth()
    const handleLogout = () => {
        console.log('clicked')
        // removeToken()
        setUser({
            id: '',
            email: '',
            username: ''
        })
        console.log(user)
        localStorage.clear();
        window.location.href = '/'
    }
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
                    storeToken(response)
                    const loginUser = await axios.get(`http://localhost:1337/users/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    // setUser({
                    //     ...user,
                    //     id: loginUser.data.id,
                    //     email: loginUser.data.email,
                    //     username: loginUser.data.username,
                    // })
                    // console.log(user.data, 'user', response.data, 'data')
                }
                const user = await httpClient.get(`/users/me`)
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
            <button
                onClick={handleLogout}
                className="ml-6 whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <span>logout</span>
            </button>
        </div>
    )
}

export default UserProfile
