import React from 'react';
import './Sidebar.css';
import OurAppbar from './OurAppbar/OurAppbar';
import { Redirect, Route, Switch } from 'react-router';

import SidebarItemList from './SidebarItemList';
import Dashboard from '../../Content/Dashboard/Dashboard';
import Workout from "../../Content/Workout/Workout";
import WorkoutTracker from "../../Content/WorkoutTracker/WorkoutTracker";
import Diet from "../../Content/Diet/Diet";
import CalorieCounter from "../../Content/CalorieCounter/CalorieCounter";
import AaisKitchen from "../../Content/AaisKitchen/AaisKitchen";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginRight: '0'
        },
    },

    content: {

        [theme.breakpoints.down('xs')]: {
            margin: '64px 16px 0'
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            margin: '64px 32px 0'
        },
        [theme.breakpoints.up('md')]: {
            margin: '64px 48px 0'
        },
    },

    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

export default function Sidebar(props) {

    const DashboardComponent = () => <Dashboard
        userCredintials={props.userCredintials}
        logOut={props.logOut}
    />

    const CalorieCounterComponent = () => <CalorieCounter
        userCredintials={props.userCredintials}
    />

    const classes = useStyles();

    const drawer = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={props.toggleDrawer(anchor, false)}
            onKeyDown={props.toggleDrawer(anchor, false)}
        >
            <List>
                {SidebarItemList.map((item, index) => (
                    <ListItem button key={item.name} component={NavLink} to={item.link}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const anchor = 'left';
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" classes={{ root: "main-appbar-div" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.toggleDrawer(anchor, true)}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <OurAppbar
                        userProfilePic={props.userCredintials.profile_picture}
                    />
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={props.anchor} onClose={props.toggleDrawer(anchor, false)}>
                {drawer(anchor)}
            </Drawer>

            <Switch>
                <Route exact path="/workoutTracker" component={WorkoutTracker} />
                <main className={classes.content}>
                    <Route path="/dashboard" component={DashboardComponent} />
                    <Route exact path="/workout" component={Workout} />
                    <Route exact path="/diet" component={Diet} />
                    <Route exact path="/calorieCounter" component={CalorieCounterComponent} />
                    <Route exact path="/aaisKitchen" component={AaisKitchen} />
                    <Redirect to="/dashboard" />
                </main>
            </Switch>

        </div>
    )
}
