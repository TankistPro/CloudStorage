import React, {useCallback} from "react";
import {loginAction} from "../store/actions/auth.action";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import {REMOVE_ERROR_STATE, REMOVE_USER_STATE, STATE_AUTH_FLAG, TOGGLE_AUTH_LOADING} from "../store/slice/userSlice";
import {RESET_FS_DATA, TOGGLE_FS_LOADING} from "../store/slice/fileSystemSlice";

export const usePassport = () => {
    const user = useSelector(state => state.user);

    const [loginAttempts, setLoginAttempts] = React.useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useCallback(async (email, password) => {
        await dispatch(
            loginAction({
                email, password
            }));
        setLoginAttempts(prevState => prevState + 1);
    }, [])

    const logout = () => {
        AuthService.logout();

        dispatch(REMOVE_USER_STATE());
        dispatch(REMOVE_ERROR_STATE());
        dispatch(RESET_FS_DATA());

        navigate('/auth');
    }

    React.useEffect(() => {
        if (user.isAuth) {
            navigate('/home');
        }
    }, [user]);

    return {
        login,
        logout,
        loginAttempts,
        loginErrors: user.error
    }
}
