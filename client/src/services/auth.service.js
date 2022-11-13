import { api } from '../api/api';

class AuthService {
    async login(payload) {
        return await api.post('/auth/login', payload);
    }

    registration() {}

    logout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }
}

export default new AuthService();
