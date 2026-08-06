import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const initialState = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') ?? 'null'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.token = payload.data.token;
            state.user = payload.data.user;
            localStorage.setItem('token', payload.data.token);
            localStorage.setItem('user', JSON.stringify(payload.data.user));
        });
    },
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
