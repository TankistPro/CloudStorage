import { api } from '@api/api.js';
import {IBaseAPIResponse, ILoginPayload} from "../domain/entities.api";
import {AxiosResponse} from "axios";

class AuthService {
    async login(payload: ILoginPayload): Promise<AxiosResponse<IBaseAPIResponse>> {
        return await api.post('/auth/login', payload);
    }

    registration() {}

    logout(): void
    {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }
}

export default new AuthService();
