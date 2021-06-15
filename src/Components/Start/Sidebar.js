import React from 'react'
import logoImg from "../../Assets/logo192.png";
import { Redirect, Route, Switch } from 'react-router'

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
    // menuButton: {
    //     marginRight: theme.spacing(2),
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'none',
    //     },
    // },
    // // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,
    // drawerPaper: {
    //     width: drawerWidth,
    // },
    // content: {
    //     flexGrow: 1,
    //     padding: theme.spacing(3),
    // },

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

    const PageOrders = () => (
        <div>
            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </div>
    )
    const PageCustomers = () => <Typography variant="h3" component="h1">Customers Page</Typography>
    const Dashboard = () => <><h1>HOme</h1>
        <img src={logoImg} />
        <img src={props.userCredintials.profile_picture} />
        <button onClick={props.logOut} >Logout</button>
    </>

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
                {items.map((item, index) => (
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
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        // onClick={props.handleDrawerToggle}
                        onClick={props.toggleDrawer(anchor, true)}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logoImg} width="30px" />
                    <Typography variant="h6" noWrap>
                        Light weight baby
                    </Typography>
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
                        <Route path="/dashboard" component={Dashboard} />
                        <Route exact path="/orders" component={PageOrders} />
                        <Route exact path="/customers" component={PageCustomers} />
                        <Redirect to="/dashboard" />
                    </Switch>

                {/* </Container> */}



            </main>

        </div>
    )
}
