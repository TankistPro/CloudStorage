import React, {useCallback} from "react";
import {loginAction} from "../store/actions/auth.action";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import {REMOVE_ERROR_STATE, REMOVE_USER_STATE} from "../store/slice/userSlice";

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
