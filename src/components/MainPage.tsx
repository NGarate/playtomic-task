import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dashboard from './Dashboard';
import Settings from './Settings';

const drawerWidth = 240;

const useStyles = makeStyles(({mixins, palette, spacing}: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: palette.background.default,
      padding: spacing(3),
      marginLeft: drawerWidth
    },
  }),
);


export default function MainPage() {
    const classes = useStyles();

    return (
        <Router>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>Playtomic task</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    <ListItem key="dashboard">
                        <Link to="/">Dashboard</Link>
                    </ListItem>
                    <ListItem key="settings">
                        <Link to="/settings">Settings</Link>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/settings" component={Settings} />
                    <Redirect to="/" />
                </Switch>
            </main>
        </Router>
    );
}
