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
    token?: string | null;
};

const checkAuth0Status = createAsyncThunk(
    'login/checkAuth0Status',
    async (auth0: Auth0ContextInterface) => {
        const token = await auth0.getAccessTokenSilently();

        return {
            user: auth0.user,
            isAuthenticated: auth0.isAuthenticated,
            token
        };
    }
);

const loginWithAuth0 = createAsyncThunk(
    'login/loginWithAuth0',
    async (auth0: Auth0ContextInterface) => {
        await auth0.loginWithRedirect();

        return { user: auth0.user, isAuthenticated: auth0.isAuthenticated };
    }
);

const logoutWithAuth0 = createAsyncThunk(
    'login/logoutWithAuth0',
    async (auth0: Auth0ContextInterface) => {
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
        user: null,
        token: null
    } as LoginState,
    reducers: {},
    extraReducers: {
        'login/loginWithAuth0/pending': (state) => ({
            ...state,
            isLoading: true
        }),

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

        'login/logoutWithAuth0/pending': (state) => ({
            ...state,
            isLoading: true
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
        }),

        'login/checkAuth0Status/pending': (state) => ({
            ...state,
            isLoading: true
        }),

        'login/checkAuth0Status/fulfilled': (state, { payload }) => ({
            ...state,
            isLoading: false,
            error: null,
            token: payload.token,
            ...getUserInfo(payload)
        }),

        'login/checkAuth0Status/rejected': (state, { error }) => ({
            ...state,
            isLoading: false,
            error: error.message,
            user: null,
            token: null,
            isAuthenticated: false
        })
    }
});

export { loginWithAuth0, logoutWithAuth0, checkAuth0Status };
export default loginSlice.reducer;
