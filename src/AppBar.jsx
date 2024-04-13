import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserNotifications from './UserNotifications'
import cover from './assets/funky-lines.png'
import { Flex } from './layout'
import UserDrawer from './user/UserDrawer'

const drawerWidth = 240

const StyledBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'funkyLines',
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

const AppBar = ({ user, funkyLines }) => {
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

  const navigate = useNavigate()

  return (
    <StyledBar position="fixed" open elevation={1} funkyLines={funkyLines}>
      <Flex
        flexRow
        width="100%"
        sx={{
          ...(funkyLines && {
            backgroundImage: `url(${cover})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }),
        }}
      >
        <Toolbar sx={{ width: '100%' }}>
          <Flex flexRow justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => navigate('/home')}
              >
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
      </Flex>
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
