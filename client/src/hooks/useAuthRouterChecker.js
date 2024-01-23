import React from 'react';

import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchUserData} from "../store/actions/auth.action";

export const useAuthRouterChecker = () => {
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem('access');

    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (!accessToken) {
            navigate('/auth')
        } else if (location.pathname === '/auth') {
            navigate('/home');
        }

        if (accessToken) {
            dispatch(fetchUserData()).then();
        }
    }, [location.pathname])
}
