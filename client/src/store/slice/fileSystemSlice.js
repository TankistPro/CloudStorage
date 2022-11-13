import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentFolder: [],
    pathStack: []
}

const fileSystemSlice = createSlice({
    name: 'fileSystem',
    initialState,
    reducers: {
        SET_CURRENT_FOLDER: (state, action) => {
            state.currentFolder = action.payload
        },
        RESET_CURRENT_FOLDER: (state) => {
            state.currentFolder = []
        },
        ADD_TO_PATH_STACK: (state, action) => {
            state.pathStack = [...state.pathStack,action.payload ]
        }
    }
})

export const { SET_CURRENT_FOLDER, RESET_CURRENT_FOLDER, ADD_TO_PATH_STACK } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
