import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import fileSystemReducer from './slice/fileSystemSlice';
import docViewerReducer from './slice/docViewerSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        fileSystem: fileSystemReducer,
        docViewer: docViewerReducer
    }
})
