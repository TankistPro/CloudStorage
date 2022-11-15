import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import {REMOVE_ERROR_STATE, SET_ERROR_STATE, SET_USER_STATE, STATE_AUTH_FLAG} from "../slice/userSlice";

export const loginAction = (loginPayload) => {
    return async dispatch => {
        try {
            const { data } = await AuthService.login(loginPayload);

            if (data.status) {
                localStorage.setItem('refresh', data.payload.refreshToken);
                localStorage.setItem('access', data.payload.accessToken); // TODO: хранить токет в cookie

                dispatch(REMOVE_ERROR_STATE());
                dispatch(STATE_AUTH_FLAG(true));
            }
        } catch (e) {
            let error = e.response.data?.message;

            if (error instanceof Object) {
                error = "Entered incorrect data"
            }

            dispatch(SET_ERROR_STATE(error));
            dispatch(STATE_AUTH_FLAG(false));
        }
    }
}

export const fetchUserData = () => {
    return async dispatch => {
        try {
            const { data } = await UserService.getMe();

            if (data.status) {
                dispatch(SET_USER_STATE(data.payload));
            }
        } catch (e) {
            let error = e.response.data.message;

            dispatch(SET_ERROR_STATE(error));
        }
    }
}
