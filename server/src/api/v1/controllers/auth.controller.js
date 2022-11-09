const { AuthService } = require('../services/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.error(errors.array())
            }

            const { email, password } = req.body;

            const tokens = await AuthService.login(email, password);
            return res.success(tokens);
        } catch (e) {
            return res.error(e.message);
        }
    }

    async registration(req, res) {
        try {
            const userPayload = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.error(errors.array())
            }

            const response = await AuthService.registration(userPayload);
            return res.success(response);
        } catch (e) {
            return res.error(e.message);
        }
    }
}

module.exports.AuthController = new AuthController();
