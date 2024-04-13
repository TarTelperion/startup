import styled from '@emotion/styled'
import CottageIcon from '@mui/icons-material/Cottage'
import GitHubIcon from '@mui/icons-material/GitHub'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import LoginIcon from '@mui/icons-material/Login'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

import { AppHeader } from './layout'

const drawerWidth = 240

const navItems = [
  { text: 'Home', icon: <CottageIcon />, route: '/home' },
  { text: 'My Stories', icon: <MenuBookIcon />, route: '/stories/joined' },
  { text: 'Join a Story', icon: <GroupAddIcon />, route: '/stories/find' },
  { text: 'Create', icon: <HistoryEduIcon />, route: '/create' },
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
  const location = useLocation()
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
              selected={location.pathname.startsWith(route)}
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
      <Button
        variant="text"
        size="small"
        sx={{
          width: 240,
          position: 'fixed',
          bottom: 0,
          left: 0,
        }}
        onClick={() => {
          window.open(
            'https://github.com/TarTelperion/startup',
            '_blank',
            'noreferrer'
          )
        }}
        startIcon={<GitHubIcon />}
      >
        Tar Telperion
      </Button>
    </Drawer>
  )
}

export default AppSidebar
