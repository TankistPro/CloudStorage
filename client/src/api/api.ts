import axios from 'axios';
import AuthService from "@services/auth.service";

export const api = axios.create({
    baseURL: 'http://localhost:5520/api/v1',
    timeout: 10000,
    withCredentials: true
});

api.interceptors.request.use(config => {
    config.headers!.Authorization = localStorage.getItem('access');

    return config;
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    const status = error.response.status;

    if (status === 401) {
        AuthService.logout();
        window.location.href = '/auth'
    }

    return Promise.reject(error);
})
