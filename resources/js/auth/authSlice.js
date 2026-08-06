import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const initialState = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') ?? 'null'),
};

function persistCredentials(state, token, user = null) {
    state.token = token;
    state.user = user;
    localStorage.setItem('token', token);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { token, user } }) => {
            persistCredentials(state, token, user);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            persistCredentials(state, payload.data.token, payload.data.user);
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
