import { api } from '../api/api';

class AuthService {
    async login(payload) {
        return await api.post('/auth/login', payload);
    }

    registration() {}
}



export default new AuthService();
