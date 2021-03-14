import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import { Auth0ContextInterface } from '@auth0/auth0-react';

export type LoginState = {
    isLoading: boolean;
    error: string | null;
    user: {
        userName?: string;
        email?: string;
        picture?: string;
    } | null;
    isAuthenticated: boolean;
    accessToken?: string;
};

const loginWithAuth0 = createAsyncThunk(
    'login/loginWithAuth0',
    async (auth0: Auth0ContextInterface, { dispatch }) => {
        dispatch(login(''));

        await auth0.loginWithRedirect();

        return { user: auth0.user, isAuthenticated: auth0.isAuthenticated };
    }
);

const logoutWithAuth0 = createAsyncThunk(
    'login/logoutWithAuth0',
    async (auth0: Auth0ContextInterface, { dispatch }) => {
        dispatch(logout(''));

        try {
            auth0.logout({
                returnTo: window.location.origin
            });

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

function getUserInfo({ user, isAuthenticated }: Auth0ContextInterface) {
    if (!user) return {};

    const { email, nickname, name, given_name, family_name, picture } = user;
    const fullName =
        given_name && family_name ? `${given_name} ${family_name}` : '';
    const userName = nickname || name || fullName || email;

    return {
        user: {
            email: email ? email : '',
            userName: userName ? userName : '',
            picture: picture ? picture : ''
        },
        isAuthenticated
    };
}

const loginSlice: Slice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        error: null,
        isAuthenticated: false,
        user: null
    } as LoginState,
    reducers: {
        login: (state) => ({
            ...state,
            isLoading: true,
            error: null,
            user: null,
            isAuthenticated: false
        }),
        logout: (state) => ({ ...state, isLoading: true, error: null })
    },
    extraReducers: {
        'login/loginWithAuth0/fulfilled': (state, { payload }) => ({
            ...state,
            isLoading: false,
            error: null,
            ...getUserInfo(payload)
        }),
        'login/loginWithAuth0/rejected': (state, { error }) => ({
            ...state,
            isLoading: false,
            error: error.message,
            user: null,
            isAuthenticated: false
        }),
        'login/logoutWithAuth0/fulfilled': (state) => ({
            ...state,
            isLoading: false,
            error: null,
            isAuthenticated: false,
            user: null
        }),
        'login/logoutWithAuth0/rejected': (state, { error }) => ({
            ...state,
            isLoading: false,
            error: error.message
        })
    }
});

const { login, logout } = loginSlice.actions;

export { login, logout, loginWithAuth0, logoutWithAuth0 };
export default loginSlice.reducer;
