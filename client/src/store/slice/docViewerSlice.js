import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    filePath: null,
    fileExtension: null
}

const docViewerSlice = createSlice({
    name: 'docViewer',
    initialState,
    reducers: {
        SET_DV_FILE_PATH:(state, action) => {
            state.filePath = action.payload;
        },
        SET_FILE_EXTENSION: (state, action) => {
            state.fileExtension = action.payload;
        },
        TOGGLE_DOCVIEWR: (state, action) => {
            state.isOpen = action.payload;
        }
    }
});

export const { SET_DV_FILE_PATH, TOGGLE_DOCVIEWR, SET_FILE_EXTENSION } = docViewerSlice.actions;

export default docViewerSlice.reducer;