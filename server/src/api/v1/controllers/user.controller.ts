import {UserService} from '../services/user.service';
import {BaseRequest, BaseResponse} from "../../../domain/serverExtend";

class UserClassController {
    async getMe(req: BaseRequest, res: BaseResponse) {
        const { id } = req.payload;
        const user = await UserService.getUserPayloadById(id);

        return res.success(user);
    }

    async saveAvatar(req: BaseRequest, res: BaseResponse) {
        const { id } = req.payload;
        const files = req.files;

        if (!files?.length) {
            return res.error('Ошибка! Файлы не переданы.');
        }

        //@ts-ignore
        const response = await UserService.saveAvatar(files[0], id);

        return res.success(response);
    }
}

export const UserController = new UserClassController();
