import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { loginWithAuth0 } from '../store/loginReducer';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useStyles = makeStyles(({ spacing }: Theme) =>
    createStyles({
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
    })
);

export default function SignIn(): JSX.Element {
    const classes = useStyles();
    const auth0 = useAuth0();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.login);

    return isAuthenticated ? (
        <Redirect to="/" />
    ) : (
        <Container maxWidth="sm">
            <Paper elevation={3} className={classes.root}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => dispatch(loginWithAuth0(auth0))}
                >
                    Sign In
                </Button>
            </Paper>
        </Container>
    );
}
