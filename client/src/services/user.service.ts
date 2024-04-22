import {api} from "@api/api.js";
import {AxiosResponse} from "axios";
import {IBaseAPIResponse} from "../domain/entities.api";

class UserService {
    async getMe(): Promise<AxiosResponse<IBaseAPIResponse>> {
        return await api.post('/user/me');
    }
}

export default new UserService();
