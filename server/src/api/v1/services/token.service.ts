import {TokenPayloadEntity} from "../../../domain/entities";

import jwt from 'jsonwebtoken';

class TokenClassService {
    #accessSecretKey = process.env.ACCESS_SECRET_KEY;
    #refreshSecretKey = process.env.REFRESH_SECRET_KEY;

    #accessExpiresIn = '1h';
    #refreshExpiresIn = '1d';

    generateAccessToken(payload: TokenPayloadEntity) {
        // @ts-ignore
        return jwt.sign(payload, this.#accessSecretKey, {
            expiresIn: this.#accessExpiresIn
        })
    }

    generateRefreshToken(payload: TokenPayloadEntity) {
        // @ts-ignore
        return jwt.sign(payload, this.#refreshSecretKey, {
            expiresIn: this.#refreshExpiresIn
        })
    }

    verifyAccessToken(token: string) {
        try {
            // @ts-ignore
            return jwt.verify(token, this.#accessSecretKey);
        } catch (e) {
            return null;
        }
    }

    verifyRefreshToken(token: string) {
        try {
            // @ts-ignore
            return jwt.verify(token, this.#refreshSecretKey);
        } catch (e) {
            return null;
        }
    }
}

export const TokenService = new TokenClassService();
