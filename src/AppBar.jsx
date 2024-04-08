import { useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Flex } from './layout'
import UserDrawer from './user/UserDrawer'

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

const AppBar = () => {
  const [open, setOpen] = useState(false)

  const setDrawerOpen = useCallback(
    (isOpen) => {
      switch (isOpen) {
        case true:
          setOpen(true)
          break
        case false:
          setOpen(false)
          break
        default:
          setOpen(!open)
      }
    },
    [setOpen, open]
  )

  return (
    <StyledBar position="fixed" open elevation={1}>
      <Toolbar>
        <Flex flexRow justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Typography variant="h6" noWrap component="div" fontWeight={700}>
              Writers' Block
            </Typography>
          </Flex>
        </Flex>
        <IconButton color="inherit" onClick={setDrawerOpen}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <UserDrawer open={open} setOpen={setDrawerOpen} />
    </StyledBar>
  )
}

export default AppBar
