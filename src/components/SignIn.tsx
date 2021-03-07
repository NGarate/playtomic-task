import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface SignInProps {
  children: React.ReactNode
}

const useStyles = makeStyles(({ spacing }: Theme) => createStyles({
    root: {
      margin: '25vh auto',
      minHeight: '50vh',
      padding: spacing(2),
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      height: 'fit-content',
      margin: 'auto'
    }
  }));

export default function MyApp({children}: SignInProps) {
  const classes = useStyles();
  const isLogged = false; // TODO add auth0
  
  return isLogged ? (
    <div>{children}</div>
  ) : (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.root} >
        <Button variant="contained" color="primary"  className={classes.button}>Sign In</Button>
      </Paper>
    </Container>
  );
};
