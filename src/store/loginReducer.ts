import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import { Auth0ContextInterface } from '@auth0/auth0-react';

interface loginState {
    isLoading: boolean;
    error: string | null;
    user?: {
        userName?: string;
        email?: string;
        picture?: string;
    };
    isAuthenticated: boolean;
    accessToken?: string;
}

const loginWithAuth0 = createAsyncThunk(
    'login/loginWithAuth0',
    async (auth0: Auth0ContextInterface, { dispatch }) => {
        try {
            dispatch(login(''));

            await auth0.loginWithPopup();

            return auth0;
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    }
);

const logoutWithAuth0 = createAsyncThunk(
    'logout/logoutWithAuth0',
    async (auth0: Auth0ContextInterface, { dispatch }) => {
        try {
            dispatch(logout(''));

            await auth0.logout({ returnTo: window.location.origin });
        } catch (error) {
            dispatch(logoutFail(error.message));
        }
    }
);

function getUserInfo({ user, isAuthenticated }: Auth0ContextInterface) {
    if (!user) return {};

    const { email, nickname, name, given_name, family_name, picture } = user;
    const fullName =
        given_name && family_name ? `${given_name} ${family_name}` : '';
    const userName = nickname || name || fullName;

    return { user: { email, userName, picture }, isAuthenticated };
}

const loginSlice: Slice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        error: null,
        isAuthenticated: false
    } as loginState,
    reducers: {
        login: (state) => ({
            ...state,
            isLoading: true,
            error: null,
            user: null,
            isAuthenticated: false
        }),
        loginFail: (state, { payload }) => ({
            ...state,
            isLoading: false,
            error: payload,
            user: null,
            isAuthenticated: false
        }),
        logout: (state) => ({ ...state, isLoading: true, error: null }),
        logoutFail: (state, { payload }) => ({
            ...state,
            isLoading: false,
            error: payload
        })
    },
    extraReducers: {
        'login/loginWithAuth0/fulfilled': (state, { payload }) => ({
            ...state,
            isLoading: false,
            error: null,
            ...getUserInfo(payload)
        }),
        'login/logoutWithAuth0/fulfilled': (state) => ({
            ...state,
            isLoading: false,
            error: null,
            isAuthenticated: false
        })
    }
});

const { login, loginFail, logout, logoutFail } = loginSlice.actions;

export { login, loginFail, loginWithAuth0, logoutWithAuth0 };
export default loginSlice.reducer;
