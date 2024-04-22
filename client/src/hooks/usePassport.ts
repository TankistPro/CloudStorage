import React, {useCallback} from "react";

import {useNavigate} from "react-router-dom";
import {loginAction} from "@store/actions/auth.action.js";
import AuthService from "@services/auth.service.js";
import {REMOVE_ERROR_STATE, REMOVE_USER_STATE} from "@store/slice/userSlice.js";
import {RESET_FS_DATA} from "@store/slice/fileSystemSlice.js";
import {useAppDispatch, useAppSelector} from "@hooks/useCustomStore";

export const usePassport = () => {
    const user = useAppSelector(state => state.user);

    const [loginAttempts, setLoginAttempts] = React.useState(0);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = useCallback(async (email: string, password: string) => {
        setLoginAttempts(prevState => prevState + 1);

        return dispatch(
            loginAction({
                email, password
            }));
    }, [])

    const logout = () => {
        AuthService.logout();

        dispatch(REMOVE_USER_STATE());
        dispatch(REMOVE_ERROR_STATE());
        dispatch(RESET_FS_DATA());

        navigate('/auth');
    }

    return {
        login,
        logout,
        loginAttempts,
        loginErrors: user.error
    }
}
