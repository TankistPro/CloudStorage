import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import fileSystemReducer from './slice/fileSystemSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        fileSystem: fileSystemReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof  store.dispatch
