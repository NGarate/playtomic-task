import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { RootState } from '../../store';
import { logoutWithAuth0 } from '../../store/loginReducer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0
            }
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth
            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none'
            }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        avatar: {
            marginRight: 0,
            marginLeft: 'auto'
        }
    })
);

export default function Menu({
    children
}: {
    children: JSX.Element;
}): JSX.Element {
    const SETTINGS_ROUTE = '/settings';
    const DASH_ROUTE = '/';
    const classes = useStyles();
    const theme = useTheme();
    const auth0 = useAuth0();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.login);

    function handleLogout(): void {
        dispatch(logoutWithAuth0(auth0));
    }

    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle(): void {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <List>
            <ListItem
                button
                selected={location.pathname === DASH_ROUTE}
                key="Dashboard"
                component={Link}
                to={DASH_ROUTE}
            >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
                button
                selected={location.pathname === SETTINGS_ROUTE}
                key="Settings"
                component={Link}
                to={SETTINGS_ROUTE}
            >
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
            <Divider />
            <ListItem button key="Log out">
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                    color="secondary"
                    onClick={handleLogout}
                    primary="Log out"
                />
            </ListItem>
        </List>
    );

    const container = window ? window.document.body : undefined;
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap>
                        Playtomic task
                    </Typography>
                    <Tooltip title={user.userName} aria-label="user name">
                        <Avatar
                            className={classes.avatar}
                            alt={user.userName}
                            src={user.picture}
                        />
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="pages navigation">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}
