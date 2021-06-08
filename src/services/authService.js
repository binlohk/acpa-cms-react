import jwt from 'jsonwebtoken'
import { httpClient } from './api/axiosHelper'
import axios from 'axios'

export const storeToken = (token) => {
  localStorage.setItem('accessToken', token)
}

export const storeUser = (user) => {
  localStorage.setItem('id', user.id)
  localStorage.setItem('username', user.username)
  localStorage.setItem('email', user.email)
}

export const getUser = () => {
  return {
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
  }
}

export const getToken = () => {
  if (_checkExpiry()) {
    _checkRefresh()
  }
  const token = localStorage.getItem('accessToken')
  return token
}

export const removeToken = () => {
  localStorage.clear();
}

const _checkExpiry = () => {
  const token = localStorage.getItem('accessToken')
  const decodedPayload = jwt.decode(token);
  const currentTime = Date.now() / 1000
  return decodedPayload.exp === currentTime;
}

const _checkRefresh = async () => {
  const token = localStorage.getItem('accessToken')
  const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users-permissions/refreshToken`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  storeToken(res.data)
  const loginUser = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  storeUser(loginUser.data)
  return localStorage.getItem('accessToken')
}