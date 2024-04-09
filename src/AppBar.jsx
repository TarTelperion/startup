import { useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import { Flex } from './layout'
import UserDrawer from './user/UserDrawer'
import UserNotifications from './UserNotifications'

const drawerWidth = 240

const StyledBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,
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

const AppBar = ({ user }) => {
  const [userDrawerOpen, setUserDrawerOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [anchor, setAnchor] = useState(null)

  const isLoggedIn = !!user

  const handleNotificationOpen = (e) => {
    setAnchor(e.currentTarget)
    setNotificationOpen((prev) => {
      return !prev
    })
  }

  const setUserDrawer = useCallback(
    (isOpen) => {
      switch (isOpen) {
        case true:
          setUserDrawerOpen(true)
          break
        case false:
          setUserDrawerOpen(false)
          break
        default:
          setUserDrawerOpen(!userDrawerOpen)
      }
    },
    [setUserDrawerOpen, userDrawerOpen]
  )

  return (
    <StyledBar position="fixed" open elevation={1}>
      <Toolbar>
        <Flex flexRow justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Typography variant="h6" noWrap component="div">
              {"Writers' Block"}
            </Typography>
          </Flex>
        </Flex>
        {user?.notifications?.length > 0 && (
          <IconButton
            color="inherit"
            onClick={(e) => {
              handleNotificationOpen(e)
            }}
          >
            <CircleNotificationsIcon />
          </IconButton>
        )}
        {isLoggedIn && (
          <IconButton
            color="inherit"
            onClick={() => {
              setUserDrawer()
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        )}
      </Toolbar>
      {isLoggedIn && (
        <UserDrawer open={userDrawerOpen} setOpen={setUserDrawerOpen} />
      )}
      {isLoggedIn && (
        <UserNotifications
          open={notificationOpen}
          anchor={anchor}
          user={user}
          setOpen={setNotificationOpen}
        />
      )}
    </StyledBar>
  )
}

export default AppBar
