import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
import MainRoutes from './Main_Routes'
import { useUser } from './hooks/useUser'
import LoginModal from './LoginModal'

import '@fontsource/spectral'

const drawerWidth = 240

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

const AppFrame = () => {
  const { user } = useUser()
  console.log('user:', user)

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
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
      <AppSidebar />
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
        <AppHeader sx={{ backgroundColor: 'transparent' }} />
        <MainRoutes />
      </Box>
      <LoginModal />
    </Box>
  )
}

export default AppFrame
