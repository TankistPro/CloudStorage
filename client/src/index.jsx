import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { store } from '@store/store';


import 'react-toastify/dist/ReactToastify.css';
import './scss/master.scss';

import App from '@components/App/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
          <BrowserRouter>
              <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
              />
              <App />
          </BrowserRouter>
      </Provider>
);
