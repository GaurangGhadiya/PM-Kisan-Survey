import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// import AppLogo from '../../assets/svg/himachal_logoo.svg'
import Image from 'next/image';
import { useRouter } from 'next/router'

import useScrollTrigger from '@mui/material/useScrollTrigger';

import Drawer from '@mui/material/Drawer';
import { CssBaseline, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { getImagePath } from '../../utils/CustomImagePath';



// const pages = ['Home', 'About', 'Survey ', 'Contact Us', 'FAQs'];
const pages = [];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const drawerWidth = 340;

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter()

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const container = window !== undefined ? () => window().document.body : undefined;





    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>

            <Typography variant="h6" sx={{ my: 2 }}>
                Field Survey
            </Typography>
            <Divider />
            <List>
                {pages.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />
            <AppBar style={{ position: 'sticky', background: "#75A47F" }}>
                <Container maxWidth="xxl">
                    <Toolbar disableGutters variant="dense" style={{ height: 22, }}>
                        <Box
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        >
                            < Image
                                src={getImagePath('/himachal_logoo.svg')}
                                width={45}
                                height={30}
                                alt="Logo"
                                style={{ marginRight: 20 }}
                            />
                        </Box>

                        <Typography
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >Field Survey - Himachal Pradesh Farmer Database
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerToggle}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                        </Box>
                        <Typography
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                           Field Survey - Himachal Pradesh Farmer Database
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: 'white', display: 'block', ml: 4, mr: 4 }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            <Button
                                key={"button"}
                                onClick={() => router.push("login")}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Login
                            </Button>


                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>


            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </Box>
    );
};
export default ResponsiveAppBar;
