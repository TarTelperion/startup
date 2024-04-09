import {
  Drawer as MuiDrawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import CottageIcon from '@mui/icons-material/Cottage'
import LoginIcon from '@mui/icons-material/Login'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'

import { AppHeader } from './layout'

const drawerWidth = 240

const navItems = [
  { text: 'Home', icon: <CottageIcon />, route: '/home' },
  { text: 'Create', icon: <HistoryEduIcon />, route: '/create' },
  { text: 'Temporary Write', icon: <DeveloperModeIcon />, route: '/write' },
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
              primary="Find Stories"
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
