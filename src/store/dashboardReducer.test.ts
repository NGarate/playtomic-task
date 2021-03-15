import { getDashboardData, DashboardState } from './dashboardReducer';
import axios from 'axios';
import store from './index';

jest.mock('axios');

describe('Dashboard Reducer', () => {
    const token = 'token';
    const defaultParams = { token, isAuthenticated: true };

    test('Should have the right initial state', () => {
        const initialState: DashboardState = store.getState().dashboard;
        const expectedState: DashboardState = {
            isLoading: false,
            error: null,
            todos: []
        };

        expect(initialState).toEqual(expectedState);
    });

    describe('Should update state when getDashboardData and...', () => {
        const todos = [
            {
                userId: 1,
                id: 1,
                title: 'title1',
                completed: false
            },
            {
                userId: 2,
                id: 2,
                title: 'title2',
                completed: true
            }
        ];

        test('success', async () => {
            const expectedState: DashboardState = {
                isLoading: false,
                error: null,
                todos
            };
            axios.get.mockResolvedValue({ data: todos });

            await store.dispatch(getDashboardData(defaultParams));

            expect(store.getState().dashboard).toEqual(expectedState);
        });

        test('fail', async () => {
            const error = new Error('An error');
            const expectedState: DashboardState = {
                isLoading: false,
                error: error.message,
                todos: []
            };
            axios.get.mockImplementationOnce(() => Promise.reject(error));

            await store.dispatch(getDashboardData(defaultParams));

            expect(store.getState().dashboard).toEqual(expectedState);
        });
        test('User is not authenticated', async () => {
            const expectedState: DashboardState = {
                isLoading: false,
                error: 'User not logged',
                todos: []
            };
            const params = { token: null, isAuthenticated: false };

            await store.dispatch(getDashboardData(params));

            expect(store.getState().dashboard).toEqual(expectedState);
        });
    });
});
