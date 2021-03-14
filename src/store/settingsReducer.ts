import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Photos = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

export type SettingsState = {
    isLoading: boolean;
    error: string | null;
    photos: Photos[];
};

const PHOTOS_PATH = 'https://jsonplaceholder.typicode.com/albums/1/photos';

const getSettingsData = createAsyncThunk(
    'settings/getSettingsData',
    ({ token, isAuthenticated }) => {
        if (!isAuthenticated)
            return Promise.reject(new Error('User not logged'));

        return axios.get(PHOTOS_PATH, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
);

const settingsSlice: Slice = createSlice({
    name: 'settings',
    initialState: {
        isLoading: false,
        error: null,
        photos: []
    } as SettingsState,
    reducers: {},
    extraReducers: {
        'settings/getSettingsData/loading': (state) => ({
            ...state,
            isLoading: true
        }),
        'settings/getSettingsData/fulfilled': (state, { payload }) => ({
            ...state,
            isLoading: false,
            error: null,
            photos: payload
        }),
        'settings/getSettingsData/rejected': (state, { error }) => ({
            ...state,
            isLoading: false,
            error: error.message,
            photos: []
        })
    }
});

export { getSettingsData };
export default settingsSlice.reducer;
