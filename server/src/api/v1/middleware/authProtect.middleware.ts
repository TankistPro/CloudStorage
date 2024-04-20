import {NextFunction} from "express";

import {TokenService} from '../services/token.service';
import {BaseRequest, BaseResponse} from "../../../domain/serverExtend";

export const authProtectMiddleware = async (req: BaseRequest, res: BaseResponse, next: NextFunction) => {
    const token: string | null = req.headers.authorization || null;

    if (!token) {
        return  res.error("Token empty", 401);
    }

    const payload = TokenService.verifyAccessToken(token);

    if (!payload) {
        return  res.error("Invalid token", 401);
    }

    req.payload = payload;

    return next();
}
