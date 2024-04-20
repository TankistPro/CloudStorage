import {Response, Request} from 'express';

import {AuthService} from '../services/auth.service';
import {validationResult} from 'express-validator';
import {BaseResponse} from "../../../domain/serverExtend";

class AuthClassController {
    async login (req: Request, res: BaseResponse) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.error(errors.array())
            }

            const { email, password } = req.body;

            const tokens = await AuthService.login(email, password);
            return res.success(tokens);
        } catch (e: any) {
            return res.error(e.message);
        }
    }

    async registration(req: Request, res: BaseResponse) {
        try {
            const userPayload = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.error(errors.array())
            }

            const response = await AuthService.registration(userPayload);
            return res.success(response);
        } catch (e: any) {
            return res.error(e.message);
        }
    }
}

export const AuthController = new AuthClassController();
