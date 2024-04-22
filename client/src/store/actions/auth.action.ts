import AuthService from '@services/auth.service.js';
import UserService from '@services/user.service.js';

import {
    REMOVE_ERROR_STATE,
    SET_ERROR_STATE,
    SET_USER_STATE,
    STATE_AUTH_FLAG,
    TOGGLE_AUTH_LOADING
} from "../slice/userSlice.js";
import {ILoginPayload} from "../../domain/entities.api";

export const loginAction = (loginPayload: ILoginPayload) => {
    return async (dispatch: any) => {
        try {
            const { data } = await AuthService.login(loginPayload);

            if (data.status) {
                localStorage.setItem('refresh', data.payload.refreshToken);
                localStorage.setItem('access', data.payload.accessToken); // TODO: хранить токет в cookie

                dispatch(REMOVE_ERROR_STATE());
                dispatch(STATE_AUTH_FLAG(true));
            }
            return true
        } catch (e: any) {
            let error = e.response.data?.message;

            if (error instanceof Object) {
                error = "Entered incorrect data"
            }

            dispatch(SET_ERROR_STATE(error));
            dispatch(STATE_AUTH_FLAG(false));

            return false
        }
    }
}

export const fetchUserData = () => {
    return async (dispatch: any) => {
        try {
            dispatch(TOGGLE_AUTH_LOADING(true));
            const { data } = await UserService.getMe();

            if (data.status) {
                dispatch(SET_USER_STATE(data.payload));
                dispatch(TOGGLE_AUTH_LOADING(false));

                return true
            }
        } catch (e: any) {
            let error = e.response.data.message;

            dispatch(SET_ERROR_STATE(error));
            return false
        }

        dispatch(TOGGLE_AUTH_LOADING(false));
    }
}
