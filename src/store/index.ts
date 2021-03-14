import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
import loginReducer from './loginReducer';
import dashboardReducer from './dashboardReducer';
import settingsReducer from './settingsReducer';

const loginPersistConfig = {
    key: 'login',
    storage: storage,
    blacklist: []
};

const store = configureStore({
    reducer: {
        login: persistReducer(loginPersistConfig, loginReducer),
        dashboard: dashboardReducer,
        settings: settingsReducer
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
