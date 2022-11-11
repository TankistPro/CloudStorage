import AuthService from '../../services/auth.service';
import {SET_ERROR_STATE, SET_USER_STATE} from "../slice/userSlice";

export const loginAction = (loginPayload) => {
    return async dispatch => {
        try {
            const { data } = await AuthService.login(loginPayload);
            dispatch(SET_USER_STATE(data));
        } catch (e) {
            let error = e.response.data.message;

            if (error instanceof Object) {
                error = "Enter correct data"
            }

            dispatch(SET_ERROR_STATE(error));
        }
    }
}
