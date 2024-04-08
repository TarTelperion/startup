import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import CottageIcon from '@mui/icons-material/Cottage'
import PublicIcon from '@mui/icons-material/Public'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { AppHeader } from './layout'
import { Group } from '@mui/icons-material'

const drawerWidth = 240

const navItems = [
  { text: 'Home', icon: <CottageIcon />, route: '/home' },
  { text: 'Create', icon: <HistoryEduIcon />, route: '/create' },
  { text: 'Temporary Write', icon: <DeveloperModeIcon />, route: '/write' },
  // { text: 'More Stories', icon: <PublicIcon />, route: '/more-stories'},
  // { text: 'Log Out', icon: <LogoutIcon />, route: '/logout'},
  // { text: 'Log In', icon: <LoginIcon />, route: '/login'},
]
const secondaryNavItems = [
  { text: 'More Stories', icon: <GroupAddIcon />, route: '/join' },
  { text: 'Log Out', icon: <LogoutIcon />, route: '/login' },
]

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

const AppSidebar = ({ openModal, user }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Drawer variant="permanent" open={open} ModalProps={{ keepMounted: true }}>
      <AppHeader isBar />
      <Divider />
      <List>
        {navItems.map(({ text, icon, route }) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              disabled={!user}
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
        {/* JUST NOTING, I REMOVED THE AUTH VARIABLE IN THE FOLLOWING CONDITIONALS AND REPLACED IT WITH FALSE. */}
        <ListItem disablePadding sx={{ display: 'block' }} key="More Stories">
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            disabled={!user}
            onClick={() => {
              navigate('/join')
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {' '}
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ opacity: open ? 1 : 0 }}
              primary="More Stories"
            />
          </ListItemButton>
        </ListItem>
        {user ? (
          ''
        ) : (
          <ListItem disablePadding sx={{ display: 'block' }} key="Log In">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => {
                openModal(true)
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <LoginIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }} primary="Log In" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  )
}

export default AppSidebar
