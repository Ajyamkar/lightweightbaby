import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import axios from '../Axios/axios';
import Sidebar from './Sidebar';

import logoImg from "../../Assets/logo192.png";

import PropTypes from 'prop-types';
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
import { withStyles, useTheme } from '@material-ui/core/styles';

// const drawerWidth = 240;
// const useStyles =theme => ({
//     root: {
//         display: 'flex',
//     },
//     drawer: {
//         [theme.breakpoints.up('sm')]: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//     },
//     appBar: {
//         [theme.breakpoints.up('sm')]: {
//             width: `calc(100% - ${drawerWidth}px)`,
//             marginLeft: drawerWidth,
//         },
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('sm')]: {
//             display: 'none',
//         },
//     },
//     // necessary for content to be below app bar
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
// });


export default class Start extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            userCredintials: {},
            isvarified: false,
            mobileOpen: false
        }
        this.logOut = this.logOut.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    componentDidMount() {
        const cookies = new Cookies();
        console.log(cookies.get('token'));

        axios.post('/auth/me', {
            token: cookies.get('token')
        }).then(res => {
            console.log(res);
            if (res.data.code === 500) {
                window.location.href = "https://ajyamkar.github.io/lightweightbaby/login"
            }
            if (!res.data.data.isSetupComplete) {
                window.location.href = "/setup"
            }
            if (res.data.code === 200) {
                this.setState({ ...this.state, isLoggedIn: true, userCredintials: res.data.data });
            }
        }).catch(err => {
            console.log(err);
            window.location.href = "/login"
        })

        this.setState({ ...this.state, isvarified: true })
    }

    logOut() {
        const cookies = new Cookies();

        cookies.remove('token', {
            path: '/',
            // maxAge: 1000 * 30,
            expiresIn: 60 * 15
        })
        window.location.href = "/login";
    }

    handleDrawerToggle() {
        this.setState({ ...this.state, mobileOpen: !this.state.mobileOpen });
    }

    render() {
        // const { window } = this.props;
        // const classes = useStyles;
        // const drawer = (
        //     <div>
        //         <div className={classes.toolbar} />
        //         <Divider />
        //         <List>
        //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        //                 <ListItem button key={text}>
        //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        //                     <ListItemText primary={text} />
        //                 </ListItem>
        //             ))}
        //         </List>
        //         <Divider />
        //         <List>
        //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
        //                 <ListItem button key={text}>
        //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        //                     <ListItemText primary={text} />
        //                 </ListItem>
        //             ))}
        //         </List>
        //     </div>
        // );

        // const container = window !== undefined ? () => window().document.body : undefined;

        return (
            <div>
                <Sidebar
                    logOut={this.logOut}
                    userCredintials={this.state.userCredintials}
                    mobileOpen={this.state.mobileOpen}
                    handleDrawerToggle = {this.handleDrawerToggle}
                />
            </div>
            // <div className={classes.root}>
            //     <CssBaseline />
            //     <AppBar position="fixed" className={classes.appBar}>
            //         <Toolbar>
            //             <IconButton
            //                 color="inherit"
            //                 aria-label="open drawer"
            //                 edge="start"
            //                 onClick={this.handleDrawerToggle}
            //                 className={classes.menuButton}
            //             >
            //                 <MenuIcon />
            //             </IconButton>
            //             <Typography variant="h6" noWrap>
            //                 Responsive drawer
            //             </Typography>
            //         </Toolbar>
            //     </AppBar>
            //     <nav className={classes.drawer} aria-label="mailbox folders">
            //         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            //         <Hidden smUp implementation="css">
            //             <Drawer
            //                 container={container}
            //                 variant="temporary"
            //                 anchor='left'
            //                 open={this.state.mobileOpen}
            //                 onClose={this.handleDrawerToggle}
            //                 classes={{
            //                     paper: classes.drawerPaper,
            //                 }}
            //                 ModalProps={{
            //                     keepMounted: true, // Better open performance on mobile.
            //                 }}
            //             >
            //                 {drawer}
            //             </Drawer>
            //         </Hidden>
            //         <Hidden xsDown implementation="css">
            //             <Drawer
            //                 classes={{
            //                     paper: classes.drawerPaper,
            //                 }}
            //                 variant="permanent"
            //                 open
            //             >
            //                 {drawer}
            //             </Drawer>
            //         </Hidden>
            //     </nav>

            //     <main className={classes.content}>
            //         <div className={classes.toolbar} />
            //         <h1>HOme</h1>
            //         <img src={logoImg} />
            //         {/* <p>{this.state.userCredintials.email}</p>
            //         <p>{this.state.userCredintials.name}</p> */}
            //         <img src={this.state.userCredintials.profile_picture} />
            //         <button onClick={this.logOut} >Logout</button>
            //     </main>

            // </div>
        )
    }
}

// Start.propTypes = {
//     classes: PropTypes.object.isRequired,
// };


// export default withStyles(useStyles , { withTheme: true })(Start);
