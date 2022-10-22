import React from 'react';

import './app.scss';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthPage } from '../../pages/AuthPage/AuthPage.jsx';
import { HomePage } from '../../pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
