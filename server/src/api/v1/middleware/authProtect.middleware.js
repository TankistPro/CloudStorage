const { TokenService } = require('../services/token.service');

const authProtectMiddleware = async (req, res, next) => {
    const token = req.headers.authorization || null;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Token empty"
        })
    }

    const payload = await TokenService.verifyAccessToken(token);

    if (!payload) {
        return res.status(401).json({
            status: false,
            message: "Invalid token"
        })
    }

    req.payload = payload;

    return next();
}

module.exports.authProtectMiddleware = authProtectMiddleware;
