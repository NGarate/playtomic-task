import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import reportWebVitals from './reportWebVitals';
import store from './store';
import MainPage from './components/MainPage';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const theme = createMuiTheme();
const persistor = persistStore(store);

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <Auth0Provider
            domain="ngarate.eu.auth0.com"
            clientId="qn0DpbODlZjc8VmpOZGPZneKUxAkY2BF"
            redirectUri={window.location.origin}
        >
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <MainPage />
                    </PersistGate>
                </Provider>
            </MuiThemeProvider>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
