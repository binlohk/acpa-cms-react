import jwt from 'jsonwebtoken';

export const storeToken = (token) => {
    localStorage.setItem('accessToken', token)
}
export const getToken = () => {
    const token = localStorage.getItem('accessToken')
    return token
}

export const refreshTokenAuth = () => {
    const token = getToken()
    const decodedPayload = jwt.decode(token);
}