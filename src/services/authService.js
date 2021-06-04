import jwt from 'jsonwebtoken'
import { httpClient } from './api/axiosHelper'

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
  // const token = localStorage.getItem('accessToken')
  // if (_checkExpiry()) {
  _checkRefresh()
  // }
  // return token
}

export const removeToken = () => {
  localStorage.clear();
}

const _checkExpiry = () => {
  const token = localStorage.getItem('accessToken')
  const decodedPayload = jwt.decode(token);
  console.log(decodedPayload.exp)
  const currentTime = Date.now() / 1000
  return decodedPayload.exp === currentTime;
}

const _checkRefresh = async () => {
  const token = localStorage.getItem('accessToken')
  const res = await httpClient.post(`/users-permissions/refreshToken`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  storeToken(res)
  const loginUser = await httpClient.get(`/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  storeUser(loginUser.data)
  return localStorage.getItem('accessToken')
}