import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {fetchUserData} from "../store/actions/auth.action";

export const PrivateRoutes = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const location = useLocation();

    React.useEffect(() => {
        dispatch(fetchUserData()).then();
    }, [])

    if (user.isLoading) return <div>Checking auth...</div>
    if (user.isAuth && location.pathname !== '/auth') return <Outlet />
    else return <Navigate to='/auth' />

}
