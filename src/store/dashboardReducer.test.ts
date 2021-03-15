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
            user: {}
        };

        expect(initialState).toEqual(expectedState);
    });

    describe('Should update state when getDashboardData and...', () => {
        const user = {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: {
                    lat: '-37.3159',
                    lng: '81.1496'
                }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
                name: 'Romaguera-Crona',
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets'
            }
        };

        test('success', async () => {
            const expectedState: DashboardState = {
                isLoading: false,
                error: null,
                user
            };
            axios.get.mockResolvedValue({ data: user });

            await store.dispatch(getDashboardData(defaultParams));

            expect(store.getState().dashboard).toEqual(expectedState);
        });

        test('fail', async () => {
            const error = new Error('An error');
            const expectedState: DashboardState = {
                isLoading: false,
                error: error.message,
                user: {}
            };
            axios.get.mockImplementationOnce(() => Promise.reject(error));

            await store.dispatch(getDashboardData(defaultParams));

            expect(store.getState().dashboard).toEqual(expectedState);
        });
        test('User is not authenticated', async () => {
            const expectedState: DashboardState = {
                isLoading: false,
                error: 'User not logged',
                user: {}
            };
            const params = { token: null, isAuthenticated: false };

            await store.dispatch(getDashboardData(params));

            expect(store.getState().dashboard).toEqual(expectedState);
        });
    });
});
