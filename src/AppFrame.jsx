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

import { AppHeader } from './layout'
import AppSidebar from './AppSidebar'
import AppBar from './AppBar'
import MainRoutes from './Main_Routes'
import { useUser } from './hooks/useUser'
import LoginModal from './user/AuthModal'
import { Waiting } from './layout'
import '@fontsource/spectral'

const AppFrame = () => {
  const { user, isLoading, isLoggedIn } = useUser()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
      }}
    >
      <CssBaseline />
      <AppBar user={user} />
      <AppSidebar openModal={handleOpen} user={user} />
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
        {isLoggedIn && <Waiting>{!isLoading && <MainRoutes />}</Waiting>}
      </Box>
      <LoginModal
        open={open}
        setClosed={handleClose}
        onLoginSuccess={handleClose}
      />
    </Box>
  )
}

export default AppFrame
