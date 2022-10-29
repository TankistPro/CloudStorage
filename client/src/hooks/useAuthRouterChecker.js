import React from 'react';

import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

export const useAuthRouterChecker = () => {
    const isAuth = useSelector(state => state.user.isAuth);

    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (!isAuth) {
            navigate('/auth')
        } else if (location.pathname === '/auth') {
            navigate('/')
        }
    }, [isAuth, location.pathname])
}
