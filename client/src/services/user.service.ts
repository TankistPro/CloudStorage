import {api} from "@api/api.js";
import {AxiosResponse} from "axios";
import {IBaseAPIResponse} from "../domain/entities.api";

class UserService {
    async getMe(): Promise<AxiosResponse<IBaseAPIResponse>> {
        return await api.post('/user/me');
    }

    async saveAvatar(avatarBlob: Blob): Promise<AxiosResponse<IBaseAPIResponse>> {
        const formData = new FormData();
        formData.set("avatar", avatarBlob);
        return await api.post('/user/set-avatar', formData);
    }
}

export default new UserService();
