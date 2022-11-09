const { AuthService } = require('../services/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const { email, password } = req.body;

            const tokens = await AuthService.login(email, password);

            return res.status(200).json({
                status: true,
                ...tokens
            });
        } catch (e) {
            return res.status(400).json({
                status: false,
                message: e.message
            });
        }
    }

    async registration(req, res) {
        try {
            const userPayload = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const response = await AuthService.registration(userPayload);

            return res.status(200).json({
                status: response
            });
        } catch (e) {
            return res.status(400).json({
                message: e.message
            });
        }
    }
}

module.exports.AuthController = new AuthController();
