import { login, logout, loginWithAuth0, logoutWithAuth0 } from './loginReducer';
import store from './index';
import { Auth0ContextInterface } from '@auth0/auth0-react';

describe('Login Reducer', () => {
    test('Should have the right initial state', () => {
        const initialState: LoginState = store.getState().login;
        const expectedState: LoginState = {
            isLoading: false,
            error: null,
            isAuthenticated: false,
            user: null
        };

        expect(initialState).toEqual(expectedState);
    });

    test('Should update the state when login starts', () => {
        const expectedState: LoginState = {
            isLoading: true,
            error: null,
            user: null,
            isAuthenticated: false
        };

        store.dispatch(login());

        const actualState = store.getState().login;

        expect(actualState).toEqual(expectedState);
    });

    describe('Should update the state loginWithAuth0 is dispatched and...', () => {
        const defaultMockUser = {
            email: 'email',
            nickname: 'nickname',
            name: 'name',
            given_name: 'given_name',
            family_name: 'family_name',
            picture: 'picture'
        };
        const defaultMockedAuth0: Auth0ContextInterface = {
            loginWithRedirect: () => Promise.resolve(),
            user: defaultMockUser,
            isAuthenticated: true
        };
        const defaultExpectedState = {
            isLoading: false,
            error: null,
            user: {
                email: defaultMockUser.email,
                userName: defaultMockUser.nickname,
                picture: defaultMockUser.picture
            },
            isAuthenticated: true
        };

        test('the user is authenticated ', async () => {
            await store.dispatch(loginWithAuth0(defaultMockedAuth0));

            expect(store.getState().login).toEqual(defaultExpectedState);
        });

        test('the user is not authenticated', async () => {
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                isAuthenticated: false
            };
            const expectedState: LoginState = {
                ...defaultExpectedState,
                isAuthenticated: false
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });

        test("the user doesn't have nickname", async () => {
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                user: {
                    ...defaultMockUser,
                    nickname: ''
                }
            };
            const expectedState: LoginState = {
                ...defaultExpectedState,
                user: {
                    ...defaultExpectedState.user,
                    userName: defaultMockUser.name
                }
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });

        test("the user doesn't have nickname nor name", async () => {
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                user: {
                    ...defaultMockUser,
                    nickname: '',
                    name: ''
                }
            };
            const { given_name, family_name } = defaultMockUser;
            const expectedState: LoginState = {
                ...defaultExpectedState,
                user: {
                    ...defaultExpectedState.user,
                    userName: `${given_name} ${family_name}`
                }
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });

        test("the user doesn't have any name", async () => {
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                user: {
                    ...defaultMockUser,
                    nickname: '',
                    name: '',
                    given_name: ''
                }
            };
            const expectedState: LoginState = {
                ...defaultExpectedState,
                user: {
                    ...defaultExpectedState.user,
                    userName: defaultMockUser.email
                }
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });

        test("the user doesn't have any name nor email", async () => {
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                user: {
                    ...defaultMockUser,
                    nickname: '',
                    name: '',
                    given_name: '',
                    email: ''
                }
            };
            const expectedState: LoginState = {
                ...defaultExpectedState,
                user: {
                    ...defaultExpectedState.user,
                    userName: '',
                    email: ''
                }
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });

        test("the user doesn't have email", async () => {
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                user: {
                    ...defaultMockUser,
                    email: ''
                }
            };
            const expectedState: LoginState = {
                ...defaultExpectedState,
                user: {
                    ...defaultExpectedState.user,
                    userName: defaultMockUser.nickname,
                    email: ''
                }
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });

        test("the user doesn't have picture", async () => {
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                user: {
                    ...defaultMockUser,
                    picture: ''
                }
            };
            const expectedState: LoginState = {
                ...defaultExpectedState,
                user: {
                    ...defaultExpectedState.user,
                    picture: ''
                }
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });

        test('the loginWithRedirect is rejected', async () => {
            const error = new Error('An error');
            const mockedAuth0: Auth0ContextInterface = {
                ...defaultMockedAuth0,
                loginWithRedirect: () => Promise.reject(error)
            };
            const expectedState: LoginState = {
                ...defaultExpectedState,
                error: error.message,
                user: null,
                isAuthenticated: false
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(expectedState);
        });
    });

    test('Should update the state when logout starts', async () => {
        const defaultMockUser = {
            email: 'email',
            nickname: 'nickname',
            name: 'name',
            given_name: 'given_name',
            family_name: 'family_name',
            picture: 'picture'
        };
        const expectedState: LoginState = {
            isLoading: true,
            error: null,
            user: {
                email: defaultMockUser.email,
                userName: defaultMockUser.nickname,
                picture: defaultMockUser.picture
            },
            isAuthenticated: true
        };
        const defaultMockedAuth0: Auth0ContextInterface = {
            loginWithRedirect: () => Promise.resolve(),
            user: defaultMockUser,
            isAuthenticated: true
        };

        await store.dispatch(loginWithAuth0(defaultMockedAuth0));

        store.dispatch(logout());

        const actualState = store.getState().login;

        expect(actualState).toEqual(expectedState);
    });

    describe('Should update the state logoutWithAuth0 is dispatched and...', () => {
        const defaultMockUser = {
            email: 'email',
            nickname: 'nickname',
            name: 'name',
            given_name: 'given_name',
            family_name: 'family_name',
            picture: 'picture'
        };
        const expectedState: LoginState = {
            isLoading: true,
            error: null,
            user: {
                email: defaultMockUser.email,
                userName: defaultMockUser.nickname,
                picture: defaultMockUser.picture
            },
            isAuthenticated: true
        };
        const mockedAuth0: Auth0ContextInterface = {
            logout: () => {
                //empty function
            },
            loginWithRedirect: () => Promise.resolve(),
            user: defaultMockUser,
            isAuthenticated: true
        };
        const defaultExpectedState = {
            isLoading: false,
            error: null,
            isAuthenticated: false,
            user: null
        };

        test('is fulfilled', async () => {
            await store.dispatch(loginWithAuth0(mockedAuth0));
            await store.dispatch(logoutWithAuth0(mockedAuth0));

            expect(store.getState().login).toEqual(defaultExpectedState);
        });

        test('is rejected', async () => {
            const error = new Error('Another error');
            const rejectedExpectedState = {
                ...expectedState,
                error: error.message,
                isLoading: false
            };
            const logout = () => {
                throw error;
            };

            await store.dispatch(loginWithAuth0(mockedAuth0));
            await store.dispatch(logoutWithAuth0({ ...mockedAuth0, logout }));

            expect(store.getState().login).toEqual(rejectedExpectedState);
        });
    });
});
