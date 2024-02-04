import React from 'react';

import {
    Routes,
    Route, useNavigate, useLocation,
} from "react-router-dom";

import './app.scss';

import { AuthPage } from '@pages/AuthPage/AuthPage.jsx';
import { HomePage } from '@pages/HomePage/HomePage';
import HomeLayout from "@layouts/HomeLayout/HomeLayout";
import SettingPage from "@pages/SettingPage/SettingPage";
import {PrivateRoutes} from "../../routes/PrivateRoutes";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    React.useEffect(() => {
        if (accessToken && (location.pathname === '/auth' || location.pathname === '/' )) navigate('/home')
    }, [location.pathname])

    const HomeLayoutHandler = (children) => {
        return  <HomeLayout>
            { children }
        </HomeLayout>
    }

    return (
        <div className="App">
            <Routes>
                    <Route element={<PrivateRoutes />} >
                        <Route path="/" element={HomeLayoutHandler(<HomePage />)} />
                        <Route path="/home" element={HomeLayoutHandler(<HomePage />)} />
                        <Route path='/settings' element={HomeLayoutHandler(<SettingPage />)}></Route>
                    </Route>
                    <Route path='/auth' element={<AuthPage />} />
            </Routes>
        </div>
    );
}

export default App;
