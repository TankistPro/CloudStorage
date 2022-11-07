const userModel = require('../db/models/User.model');

class AuthService {
    login() {}

    async registration(userPayload) {
        try {
            const candidate = await userModel.findOne( { where: { email: userPayload.email } });

            if (candidate) {
                throw new Error("User already exist");
            }

            await userModel.create(userPayload);

            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports.AuthService = new AuthService();
