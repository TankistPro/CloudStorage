import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentFolder: [],
    isLoading: true,
}

const fileSystemSlice = createSlice({
    name: 'fileSystem',
    initialState,
    reducers: {
        SET_CURRENT_FOLDER: (state, action) => {
            state.currentFolder = action.payload
        },
        RESET_FS_DATA: (state) => {
            state.currentFolder = []
            state.isLoading = true;
        },
        SPLICE_DATA: (state, action) => {
            const name = action.payload;
            const index = state.currentFolder.findIndex(e => e.name === name);

            state.currentFolder.splice(index, 1);
        },
        TOGGLE_FS_LOADING: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

export const { SET_CURRENT_FOLDER,
    RESET_FS_DATA,
    SPLICE_DATA,
    TOGGLE_FS_LOADING} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
