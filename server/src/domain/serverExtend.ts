import {Response, Request} from 'express';
import {TokenPayloadEntity} from "./entities";

type TypedResponse<T> = Omit<Response, 'json'> & { json(data: T): Response };
export type SuccessResponse = TypedResponse<{
    status: true,
    statusCode: number,
    payload: {}
}>
export type ErrorResponse = TypedResponse<{
    status: false,
    statusCode: number,
    message: string
}>
export interface BaseResponse extends Response {
    // payload: TokenPayloadEntity,
    success: (payload: {}, statusCode?: number) => SuccessResponse,
    error: (message: any, statusCode?: number) => ErrorResponse
}

export interface BaseRequest extends Request {
    payload: TokenPayloadEntity,
}
