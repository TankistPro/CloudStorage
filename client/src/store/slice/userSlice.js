import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuth: false,
    error: {
        status: false,
        message: null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_USER_STATE: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        REMOVE_USER_STATE: (state) => {
            state.user = {}
            state.isAuth = false;
        },
        SET_ERROR_STATE: (state, action) => {
            state.error.status = true;
            state.error.message = action.payload;
        },
        REMOVE_ERROR_STATE: (state, action) => {
            state.error.status = false;
            state.error.message = null;
        }
    }
})

export const { SET_USER_STATE, REMOVE_USER_STATE, SET_ERROR_STATE, REMOVE_ERROR_STATE } = userSlice.actions;

export default userSlice.reducer;
