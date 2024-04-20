import {BaseResponse} from "../../../domain/serverExtend";

export const success = (res: BaseResponse, payload: {}, statusCode: number = 200) => {
    return res.status(statusCode).json({
        status: true,
        statusCode,
        payload
    })
}

export const error = (res: BaseResponse, message: string, statusCode: number = 400) => {
    return res.status(statusCode).json({
        status: false,
        statusCode,
        message
    })
}
