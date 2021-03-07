import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SignIn from './SignIn';

export default function MyApp() { 
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <SignIn />
      </Container>
    </>
  )
};
