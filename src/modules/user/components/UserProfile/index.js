import axios from 'axios'
import { httpClient } from '../../../../services/api/axiosHelper'
import { UserContext } from '../../../../contexts/UserContext'
import React, { useEffect, useContext } from 'react'
import jwt from 'jsonwebtoken';
import { storeUser, storeToken, getToken, removeToken } from '../../../../services/authService'

function UserProfile() {

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
                    storeUser(loginUser.data)
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
        </div>
    )
}

export default UserProfile
