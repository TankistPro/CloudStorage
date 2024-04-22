import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserData} from "../../domain/entities.api";

type initialState = {
    user: IUserData,
    isAuth: boolean,
    isLoading: boolean,
    error: {
        status: boolean,
        message: string | null
    }
}

const initialState : initialState = {
    user: {
        id: 0,
        firstName: '',
        email: '',
        baseWorkspacePath: ''
    },
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
        SET_USER_STATE: (state, action: PayloadAction<IUserData>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        REMOVE_USER_STATE: (state) => {
            state.user = {
                id: 0,
                firstName: '',
                email: '',
                baseWorkspacePath: ''
            }
            state.isAuth = false;
            state.isLoading = true;
        },
        STATE_AUTH_FLAG: (state, action: PayloadAction<boolean>) => {
          state.isAuth = action.payload;
        },
        SET_ERROR_STATE: (state, action: PayloadAction<string | null>) => {
            state.error.status = true;
            state.error.message = action.payload;
        },
        REMOVE_ERROR_STATE: (state) => {
            state.error.status = false;
            state.error.message = null;
        },
        TOGGLE_AUTH_LOADING: (state, action: PayloadAction<boolean>) => {
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
