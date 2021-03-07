import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export default function MyApp() {
  const classes = useStyles()

  return (
    <Paper elevation={3} className={classes.root} >
      <Button variant="contained" color="primary"  className={classes.button}>Sign In</Button>
    </Paper>
  )
};
