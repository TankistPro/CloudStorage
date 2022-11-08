const { SecureService } = require('./secure.service');
const { FileSystemService } = require('./fileSystem.service');

const userModel = require('../db/models/User.model');

class AuthService {
    login() {}

    async registration(userPayload) {
        try {
            const candidate = await userModel.findOne( { where: { email: userPayload.email } });

            if (candidate) {
                throw new Error("User already exist");
            }

            const hashPassword = SecureService.generateHashPassword(userPayload.password);
            const userBaseWorkspacePath = FileSystemService.createUserBaseWorkspacePath();

            if (!hashPassword || !userBaseWorkspacePath) {
                throw new Error("System error! Please try again later");
            }

            userPayload.password = hashPassword;
            userPayload.baseWorkspacePath = userBaseWorkspacePath;

            await userModel.create(userPayload);

            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports.AuthService = new AuthService();
