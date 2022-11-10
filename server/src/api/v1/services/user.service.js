const userModel = require('../db/models/User.model');

class UserService {
    /**
     * Получение информации о пользователе по ID (без пароля)
     */
    async getUserPayloadById(id) {
        return await userModel.findOne({
            where: { id },
            attributes: ['id', 'firstName', 'lastName', 'email', 'avatarHash', 'baseWorkspacePath']
        })
    }
}

module.exports.UserService  = new UserService();
