import axios from "axios";
import jwt from 'jsonwebtoken';
import { getToken } from '../..//services/api/authHelper'

export const httpClient = axios.create({
    baseURL: "http://localhost:1337",
    // baseURL: process.env.APP_API_BASE_URL,
});
httpClient.interceptors.request.use(function (config) {
    const token = getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});