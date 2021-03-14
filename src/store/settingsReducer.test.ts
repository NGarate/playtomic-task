import { getSettingsData, SettingsState } from './settingsReducer';
import axios from 'axios';
import store from './index';

jest.mock('axios');

describe('Settings Reducer', () => {
    const token = 'token';
    const isAuthenticated = true;
    const defaultParams = { token, isAuthenticated };

    test('Should have the right initial state', () => {
        const initialState: SettingsState = store.getState().settings;
        const expectedState: SettingsState = {
            isLoading: false,
            error: null,
            photos: []
        };

        expect(initialState).toEqual(expectedState);
    });

    describe('Should update state when getSettingsData and...', () => {
        const photos = [
            {
                albumId: 1,
                id: 1,
                title: 'title1',
                url: 'url1',
                thumbnailUrl: 'thumbnailUrl1'
            },
            {
                albumId: 2,
                id: 2,
                title: 'title2',
                url: 'url2',
                thumbnailUrl: 'thumbnailUrl2'
            }
        ];

        test('success', async () => {
            const expectedState: SettingsState = {
                isLoading: false,
                error: null,
                photos
            };
            axios.get.mockResolvedValue(photos);

            await store.dispatch(getSettingsData(defaultParams));

            expect(store.getState().settings).toEqual(expectedState);
        });

        test('fail', async () => {
            const error = new Error('An error');
            const expectedState: SettingsState = {
                isLoading: false,
                error: error.message,
                photos: []
            };
            axios.get.mockImplementationOnce(() => Promise.reject(error));

            await store.dispatch(getSettingsData(defaultParams));

            expect(store.getState().settings).toEqual(expectedState);
        });

        test('User is not authenticated', async () => {
            const expectedState: SettingsState = {
                isLoading: false,
                error: 'User not logged',
                photos: []
            };
            const params = { token: null, isAuthenticated: false };
            await store.dispatch(getSettingsData(params));

            expect(store.getState().settings).toEqual(expectedState);
        });
    });
});
