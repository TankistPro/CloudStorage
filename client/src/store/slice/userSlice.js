import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuth: false,
    isLoading: true,
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
            state.isLoading = true;
        },
        STATE_AUTH_FLAG: (state, action) => {
          state.isAuth = action.payload;
        },
        SET_ERROR_STATE: (state, action) => {
            state.error.status = true;
            state.error.message = action.payload;
        },
        REMOVE_ERROR_STATE: (state, action) => {
            state.error.status = false;
            state.error.message = null;
        },
        TOGGLE_AUTH_LOADING: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

export const {
    SET_USER_STATE,
    REMOVE_USER_STATE,
    SET_ERROR_STATE,
    REMOVE_ERROR_STATE,
    STATE_AUTH_FLAG,
    TOGGLE_AUTH_LOADING} = userSlice.actions;

export default userSlice.reducer;
