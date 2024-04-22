import React from 'react';

import {
    Routes,
    Route, useNavigate, useLocation,
} from "react-router-dom";

import './app.scss';

import { AuthPage } from '@pages/AuthPage/AuthPage';
import { HomePage } from '@pages/HomePage/HomePage.js';
import HomeLayout from "@layouts/HomeLayout/HomeLayout.js";
import SettingPage from "@pages/SettingPage/SettingPage.js";
import {PrivateRoutes} from "../../routes/PrivateRoutes.js";
import {ModalContextProvider} from "@context/useModalContext";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    React.useEffect(() => {
        if (accessToken && (location.pathname === '/auth' || location.pathname === '/' )) navigate('/home')
    }, [location.pathname])


    const HomeLayoutHandler = (children: React.ReactNode) => {
        return  <HomeLayout>
            { children }
        </HomeLayout>
    }

    return (
        <ModalContextProvider>
            <div className="App">
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path="/" element={HomeLayoutHandler(<HomePage/>)}/>
                        <Route path="/home" element={HomeLayoutHandler(<HomePage/>)}/>
                        <Route path='/settings' element={HomeLayoutHandler(<SettingPage/>)}></Route>
                    </Route>
                    <Route path='/auth' element={<AuthPage/>}/>
                </Routes>
            </div>
        </ModalContextProvider>
    );
}

export default App;
