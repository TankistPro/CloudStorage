import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {REMOVE_ERROR_STATE, REMOVE_USER_STATE, SET_ERROR_STATE, STATE_AUTH_FLAG} from "@store/slice/userSlice";
import {RESET_FS_DATA} from "@store/slice/fileSystemSlice";
import {userApi} from "@api/userApi.js";

export const usePassport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [loginMutation, { isLoading, isFetching, isError, error  }] = userApi.useLoginMutation();

    const login = React.useCallback(async(email, password) => {
        try {
            const data = await loginMutation({email, password}).unwrap();

            if (data.status) {
                localStorage.setItem('refresh', data.payload.refreshToken);
                localStorage.setItem('access', data.payload.accessToken); // TODO: хранить токет в cookie

                dispatch(REMOVE_ERROR_STATE());
                dispatch(STATE_AUTH_FLAG(true));

                return true
            }
        } catch (e) {
            dispatch(SET_ERROR_STATE(e));
            return false
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        dispatch(REMOVE_USER_STATE());
        dispatch(REMOVE_ERROR_STATE());
        dispatch(RESET_FS_DATA());

        navigate('/auth');
    }

    return {
        login,
        logout,
        loginErrors: user.error
    }
}
