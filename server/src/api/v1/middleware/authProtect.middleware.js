const { TokenService } = require('../services/token.service');

const authProtectMiddleware = async (req, res, next) => {
    const token = req.headers.authorization || null;

    if (!token) {
        return  res.error("Token empty", 401);
    }

    const payload = await TokenService.verifyAccessToken(token);

    if (!payload) {
        return  res.error("Invalid token", 401);
    }

    req.payload = payload;

    return next();
}

module.exports.authProtectMiddleware = authProtectMiddleware;
