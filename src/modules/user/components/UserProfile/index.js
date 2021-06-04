import axios from 'axios'
import { httpClient } from '../../../../services/api/axiosHelper'
import { UserContext } from '../../../../contexts/UserContext'
import React, { useEffect, useContext } from 'react'
import jwt from 'jsonwebtoken';
import { storeUser, storeToken, getToken, removeToken } from '../../../../services/authService'

function UserProfile() {


    return (
        <div>
            User profile
        </div>
    )
}

export default UserProfile

