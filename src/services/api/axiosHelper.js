import axios from "axios";
import jwt from 'jsonwebtoken';
import { getToken, storeToken, storeUser } from '../../services/authService'

export const httpClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER,
});
httpClient.interceptors.request.use(function (config) {
    const token = getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});


