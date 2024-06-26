import { Box, CssBaseline } from '@mui/material'
import { useState } from 'react'
import AppBar from './AppBar'
import AppSidebar from './AppSidebar'
import MainRoutes from './MainRoutes'
import { useUser } from './hooks/useUser'
import { AppHeader, Flex, Waiting } from './layout'
import AppSnackbar from './layout/AppSnackbar'
import LoginModal from './user/AuthModal'

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
          width: '100%',
          overflow: 'hidden',
          px: 3,
        }}
      >
        <AppHeader sx={{ backgroundColor: 'transparent' }} />
        <Flex flexColumn width="100%">
          {isLoggedIn && (
            <Waiting>{!isLoading && <MainRoutes userId={user._id} />}</Waiting>
          )}
        </Flex>
      </Box>
      <LoginModal
        open={open}
        setClosed={handleClose}
        onLoginSuccess={handleClose}
      />
      <AppSnackbar />
    </Box>
  )
}

export default AppFrame
