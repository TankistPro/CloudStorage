import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseFile} from "../../domain/entities";

type initialState = {
    currentFolder: BaseFile[],
    isLoading: boolean
}

const initialState : initialState = {
    currentFolder: [],
    isLoading: true,
}

const fileSystemSlice = createSlice({
    name: 'fileSystem',
    initialState,
    reducers: {
        SET_CURRENT_FOLDER: (state, action: PayloadAction<BaseFile[]>) => {
            state.currentFolder = action.payload
        },
        RESET_FS_DATA: (state) => {
            state.currentFolder = []
            state.isLoading = true;
        },
        SPLICE_DATA: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            const index = state.currentFolder.findIndex(e => e.name === name);

            state.currentFolder.splice(index, 1);
        },
        TOGGLE_FS_LOADING: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const { SET_CURRENT_FOLDER,
    RESET_FS_DATA,
    SPLICE_DATA,
    TOGGLE_FS_LOADING} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
