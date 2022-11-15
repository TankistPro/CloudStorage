import React from 'react';

import {
  Routes,
  Route,
    Navigate
} from "react-router-dom";

import './app.scss';

import { AuthPage } from '../../pages/AuthPage/AuthPage.jsx';
import { HomePage } from '../../pages/HomePage/HomePage';
import { useAuthRouterChecker } from '../../hooks/useAuthRouterChecker';

function App() {
    useAuthRouterChecker();

    return (
        <div className="App">
            <Routes>
                <Route path='/auth' element={<AuthPage />} />
                <Route path='/home'>
                    <Route path=":path" element={<HomePage />} />
                    <Route path="" element={<HomePage />} />
                </Route>
                <Route path='*' element={<Navigate to='/home' replace />} />
            </Routes>
        </div>
    );
}

export default App;
