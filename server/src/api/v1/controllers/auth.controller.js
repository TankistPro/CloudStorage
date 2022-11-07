const { AuthService } = require('../services/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
    login(req, res) {}

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
