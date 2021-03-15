import React, { useEffect } from 'react';
import Menu from './common/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardData, User } from '../store/dashboardReducer';
import { RootState } from '../store';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

export default function Dashboard(): JSX.Element {
    const dispatch = useDispatch();
    const { token, isAuthenticated } = useSelector(
        (state: RootState) => state.login
    );
    const { user }: { user: User } = useSelector(
        (state: RootState) => state.dashboard
    );

    useEffect(() => {
        dispatch(getDashboardData({ token, isAuthenticated }));
    }, []);
    const classes = useStyles();

    return (
        <Menu>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        {user.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {user.email}
                    </Typography>
                    <Typography
                        className={classes.pos}
                        color="textSecondary"
                    ></Typography>
                    <Typography variant="body2" component="p">
                        {user &&
                            user.address &&
                            Object.values(user.address).map((value: string) => {
                                <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                >
                                    {value}
                                </Typography>;
                            })}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <Typography
                            className={classes.pos}
                            color="textSecondary"
                        >
                            {user.phone}
                        </Typography>
                        <Typography
                            className={classes.pos}
                            color="textSecondary"
                        >
                            {user.website}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" component="p">
                        {user &&
                            user.company &&
                            Object.values(user.company).map((value: string) => {
                                <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                >
                                    {value}
                                </Typography>;
                            })}
                    </Typography>
                </CardContent>
            </Card>
        </Menu>
    );
}
