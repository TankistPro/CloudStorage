import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {fetchUserData} from "@store/actions/auth.action";
import Loader from "@SharedComponents/Loader/Loader.jsx";

export const PrivateRoutes = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const location = useLocation();

    React.useEffect(() => {
        dispatch(fetchUserData()).then();
    }, [])

    if (user.isLoading) return <div style={{height: '100vh', display: 'flex', justifyContent: "center"}}> <Loader loadingText="Идет загрузка данных..." /></div>
    if (user.isAuth && location.pathname !== '/auth') return <Outlet />
    else return <Navigate to='/auth' />
}
