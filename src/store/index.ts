import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const loginPersistConfig = {
    key: 'login',
    storage: storage,
    blacklist: ['isLoading']
};

const store = configureStore({
    reducer: {
        login: persistReducer(loginPersistConfig, loginReducer)
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
