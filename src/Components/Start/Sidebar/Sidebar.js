import React from 'react';
import './Sidebar.css';
import OurAppbar from './OurAppbar/OurAppbar';
import logoImg from "../../../Assets/logo192.png";
import { Redirect, Route, Switch } from 'react-router';

import SidebarItemList from './OurAppbar/SidebarItemList';
import Dashboard from '../../Content/Dashboard/Dashboard';
import Workout from "../../Content/Workout/Workout";
import WorkoutTracker from "../../Content/WorkoutTracker/WorkoutTracker";
import Diet from "../../Content/Diet/Diet";
import CalorieCounter from "../../Content/CalorieCounter/CalorieCounter";
import AaisKitchen from "../../Content/AaisKitchen/AaisKitchen";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Container } from '@material-ui/core';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    // },
    // drawer: {
    //     [theme.breakpoints.up('sm')]: {
    //         width: drawerWidth,
    //         flexShrink: 0,
    //     },
    // },
    // appBar: {
    //     [theme.breakpoints.up('sm')]: {
    //         width: `calc(100% - ${drawerWidth}px)`,
    //         marginLeft: drawerWidth,
    //     },
    // },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    // // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,
    // drawerPaper: {
    //     width: drawerWidth,
    // },
    content: {
        // flexGrow: 1,
        marginTop: theme.spacing(8),
        // padding: theme.spacing(3),
    },

    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

const items = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        //   Icon: IconDashboard,
    },
    {
        name: 'Orders',
        link: '/orders',
        //   Icon: IconShoppingCart,
    },
    {
        name: 'Customers',
        link: '/customers',
        //   Icon: IconPeople,
    }
]

export default function Sidebar(props) {

    const DashboardComponent = () => <Dashboard
        userCredintials={props.userCredintials}
        logOut={props.logOut}
    />


    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={props.toggleDrawer(anchor, false)}
            onKeyDown={props.toggleDrawer(anchor, false)}
        >
            {/* <div className={classes.toolbar} />
            <Divider /> */}
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

    const container = window !== undefined ? () => window().document.body : undefined;
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

            {/* <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={props.mobileOpen}
                        onClose={props.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav> */}

            <main className={classes.content}>

                {/* <Container > */}

                <Switch>
                    <Route path="/dashboard" component={DashboardComponent} />
                    <Route exact path="/workout" component={Workout} />
                    <Route exact path="/workoutTracker" component={WorkoutTracker} />
                    <Route exact path="/diet" component={Diet} />
                    <Route exact path="/calorieCounter" component={CalorieCounter} />
                    <Route exact path="/aaisKitchen" component={AaisKitchen} />
                    <Redirect to="/dashboard" />
                </Switch>

                {/* </Container> */}



            </main>

        </div>
    )
}
