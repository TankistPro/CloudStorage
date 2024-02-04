import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginAction} from "@store/actions/auth.action";
import AuthService from "@services/auth.service";
import {REMOVE_ERROR_STATE, REMOVE_USER_STATE} from "@store/slice/userSlice";
import {RESET_FS_DATA} from "@store/slice/fileSystemSlice";

export const usePassport = () => {
    const user = useSelector(state => state.user);

    const [loginAttempts, setLoginAttempts] = React.useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useCallback(async (email, password) => {
        setLoginAttempts(prevState => prevState + 1);

        return await dispatch(
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
