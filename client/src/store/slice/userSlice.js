import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_USER_STATE: (state, action) => {
            state = action.payload
        },
        REMOVE_USER_STATE: (state) => {
            state = {}
        }
    }
})

export const { SET_USER_STATE, REMOVE_USER_STATE } = userSlice.actions;

export default userSlice.reducer;
