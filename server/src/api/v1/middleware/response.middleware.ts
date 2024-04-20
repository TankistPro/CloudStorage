import { success, error } from '../utils/http.util';
import {NextFunction, Response, Request} from "express";
import {BaseResponse} from "../../../domain/serverExtend";

export = (req: Request, res: BaseResponse, next: NextFunction) => {

    // @ts-ignore
    res.success = (payload, statusCode= 200) => {
        success(res, payload, statusCode);
    }

    // @ts-ignore
    res.error = (message, statusCode= 400) => {
        error(res, message, statusCode)
    }

    return next()
}
