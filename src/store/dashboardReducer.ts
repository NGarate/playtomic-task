import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Todos = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export type DashboardState = {
    isLoading: boolean;
    error: string | null;
    todos: Todos[];
};

const TODOS_PATH = 'https://jsonplaceholder.typicode.com/users/1/todos';

const getDashboardData = createAsyncThunk(
    'dashboard/getDashboardData',
    (arg: { token: string; isAuthenticated: boolean }) => {
        if (!arg.isAuthenticated)
            return Promise.reject(new Error('User not logged'));

        return axios.get(TODOS_PATH, {
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
        todos: []
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
            todos: payload.data
        }),
        'dashboard/getDashboardData/rejected': (state, { error }) => ({
            ...state,
            isLoading: false,
            error: error.message,
            todos: []
        })
    }
});

export { getDashboardData };
export default dashboardSlice.reducer;
