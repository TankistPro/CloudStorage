import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_USER_STATE: (state, action) => {
            state = action.payload;
            state.isAuth = true;
        },
        REMOVE_USER_STATE: (state) => {
            state = {}
            state.isAuth = false;
        }
    }
})

export const { SET_USER_STATE, REMOVE_USER_STATE } = userSlice.actions;

export default userSlice.reducer;
