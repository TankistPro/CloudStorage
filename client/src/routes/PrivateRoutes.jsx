import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
// import {fetchUserData} from "@store/actions/auth.action";

import {SET_ERROR_STATE, SET_USER_STATE, TOGGLE_AUTH_LOADING} from "@store/slice/userSlice.js";
import {userApi} from "@api/userApi.js";

export const PrivateRoutes = () => {
    const dispatch = useDispatch();
    const [getMe, { isFetching, isLoading }] = userApi.useGetMeMutation()

    const location = useLocation();

    const getMeHandler = async () => {
        const data = await getMe().unwrap();

        if (data.status) {
            dispatch(SET_USER_STATE(data.payload));
        } else {
            dispatch(SET_ERROR_STATE(data.message));
        }
    }

    React.useEffect(() => {
        (async () => {
            await getMeHandler()
        })()
    }, [])

    if (isLoading) return <div>Checking auth...</div>
    if ((!isLoading)  && location.pathname !== '/auth') return <Outlet />
     return <Navigate to='/auth' />

}
