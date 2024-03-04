import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import fileSystemReducer from './slice/fileSystemSlice';
import docViewerReducer from './slice/docViewerSlice';
import {userApi} from "@api/userApi.js";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        user: userReducer,
        fileSystem: fileSystemReducer,
        docViewer: docViewerReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
})

setupListeners(store.dispatch);
