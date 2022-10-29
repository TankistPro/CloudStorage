import React from 'react';

import {
  Routes,
  Route,
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
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
