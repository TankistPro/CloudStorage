import {UserService} from '../services/user.service';
import {BaseRequest, BaseResponse} from "../../../domain/serverExtend";

class UserClassController {
    async getMe(req: BaseRequest, res: BaseResponse) {
        const { id } = req.payload;
        const user = await UserService.getUserPayloadById(id);

        return res.success(user);
    }
}

export const UserController = new UserClassController();
