import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentFolder: [],
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
        }
    }
})

export const { SET_CURRENT_FOLDER, RESET_CURRENT_FOLDER } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
