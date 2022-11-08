const jwt = require('jsonwebtoken');

class TokenService {
    #accessSecretKey = process.env.ACCESS_SECRET_KEY;
    #refreshSecretKey = process.env.REFRESH_SECRET_KEY;

    #accessExpiresIn = '1h';
    #refreshExpiresIn = '1d';

    generateAccessToken(payload) {
        return jwt.sign(payload, this.#accessSecretKey, {
            expiresIn: this.#accessExpiresIn
        })
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, this.#refreshSecretKey, {
            expiresIn: this.#refreshExpiresIn
        })
    }

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.#accessSecretKey);
        } catch (e) {
            return null;
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.#refreshSecretKey);
        } catch (e) {
            return null;
        }
    }
}

module.exports.TokenService = new TokenService();
