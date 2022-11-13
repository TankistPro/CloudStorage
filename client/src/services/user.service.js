import {api} from "../api/api";

class UserService {
    async getMe() {
        return await api.post('/user/me');
    }
}

export default new UserService();
