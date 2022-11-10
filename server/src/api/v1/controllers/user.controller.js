const { UserService } = require('../services/user.service');

class UserController {
    async getMe(req, res) {
        const { id } = req.payload;

        const user = await UserService.getUserPayloadById(id);

        return res.success(user);
    }
}

module.exports.UserController = new UserController();
