import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import {loginAction} from "../store/actions/auth.action";
import {useNavigate} from "react-router-dom";

export const useLogin = () => {
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useCallback(async (email, password) => {
        await dispatch(
            loginAction({
            email, password
        }))
    }, [])

    React.useEffect(() => {
        if (user.isAuth) {
            navigate('/')
        }
    }, [user]);

    return {
        login,
        user: user.user,
        errors: user.error
    }
}
