import { useState, useEffect, useCallback } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import CottageIcon from '@mui/icons-material/Cottage'
import PublicIcon from '@mui/icons-material/Public'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Flex } from './layout'
import MainRoutes from './Main_Routes'

import '@fontsource/spectral'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const Header = styled(Flex)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  // backgroundColor: theme.palette.primary.main,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const navItems = [
  { text: 'Home', icon: <CottageIcon />, route: '/home' },
  { text: 'User', icon: <AccountCircleIcon />, route: '/user' },
  { text: 'Create', icon: <HistoryEduIcon />, route: '/create' },
  // { text: 'More Stories', icon: <PublicIcon />, route: '/more-stories'},
  // { text: 'Log Out', icon: <LogoutIcon />, route: '/logout'},
  // { text: 'Log In', icon: <LoginIcon />, route: '/login'},
]

const AppFrame = () => {
  const theme = useTheme()
  const [auth, setAuth] = useState(false)
  const open = true
  // const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth')
        if (res.status === 200) {
          setAuth(true)
        } else {
          setAuth(false)
        }
      } catch (err) {
        setAuth(false)
        console.log(err)
      }
    }
    checkAuth()
  }, [])

  const navigate = useNavigate()

  // const handleDrawerOpen = () => {
  //   setOpen(true)
  // }

  // const handleDrawerClose = () => {
  //   setOpen(false)
  // }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        // flexDirection: 'column',
        // flex: '1 1 auto',
        // overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Writers' Block
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        ModalProps={{ keepMounted: true }}
      >
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader> */}
        <Header backgroundColor={theme.palette.primary.main} boxShadow={1} />
        <Divider />
        <List>
          {navItems.map(({ text, icon, route }) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: 'block' }}
              // Below is the program to make the links disable
              // {...(auth === false ? { disabled: true } : {})}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(route)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['More Stories', 'Log Out'].map((text, index) => (
            <ListItem
              disablePadding
              sx={{ display: 'block' }}
              key={text === 'More Stories' ? text : auth ? 'Log Out' : 'Log In'}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 ? (
                    <PublicIcon />
                  ) : auth ? (
                    <LogoutIcon />
                  ) : (
                    <LoginIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    text === 'More Stories' ? text : auth ? 'Log Out' : 'Log In'
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          height: '100%',
          px: 3,
          pb: 3,
        }}
      >
        <Header sx={{ backgroundColor: 'transparent' }} />
        <MainRoutes />
      </Box>
    </Box>
  )
}

export default AppFrame
