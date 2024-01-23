import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentFolder: []
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
        SPLICE_DATA: (state, action) => {
            const name = action.payload;
            const index = state.currentFolder.findIndex(e => e.name === name);

            state.currentFolder.splice(index, 1);
        }
    }
})

export const { SET_CURRENT_FOLDER, RESET_CURRENT_FOLDER, SPLICE_DATA } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
