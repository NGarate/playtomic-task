import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignIn from './SignIn';
import MainPage from './MainPage';

export default function MyApp() { 
  return (
    <>
      <CssBaseline />
      <SignIn>
        <MainPage />
      </SignIn>
  </>
  )
};
