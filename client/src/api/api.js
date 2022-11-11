import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5520/api/v1',
    timeout: 10000,
    withCredentials: true
});
