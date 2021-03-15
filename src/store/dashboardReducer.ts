import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import axios from 'axios';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    geo: { lat: string; lng: string };
    phone: string;
    website: string;
    company: { name: string; catchPhrase: string; bs: string };
};

export type DashboardState = {
    isLoading: boolean;
    error: string | null;
    user: User | Record<string, unknown>;
};

function getRandomUserPath(): string {
    const BASE_PATH = 'https://jsonplaceholder.typicode.com/users/';
    const randomId: number = Math.floor(Math.random() * 10) + 1;
    return BASE_PATH + randomId;
}

const getDashboardData = createAsyncThunk(
    'dashboard/getDashboardData',
    (arg: { token: string; isAuthenticated: boolean }) => {
        if (!arg.isAuthenticated)
            return Promise.reject(new Error('User not logged'));

        return axios.get(getRandomUserPath(), {
            headers: {
                Authorization: `Bearer ${arg.token}`
            }
        });
    }
);

const dashboardSlice: Slice = createSlice({
    name: 'dashboard',
    initialState: {
        isLoading: false,
        error: null,
        user: {}
    } as DashboardState,
    reducers: {},
    extraReducers: {
        'dashboard/getDashboardData/loading': (state) => ({
            ...state,
            isLoading: true
        }),
        'dashboard/getDashboardData/fulfilled': (state, { payload }) => ({
            ...state,
            isLoading: false,
            error: null,
            user: payload.data
        }),
        'dashboard/getDashboardData/rejected': (state, { error }) => ({
            ...state,
            isLoading: false,
            error: error.message,
            user: {}
        })
    }
});

export { getDashboardData };
export default dashboardSlice.reducer;
