import CloseIcon from '@mui/icons-material/Close'
import { Box, CssBaseline, IconButton } from '@mui/material'
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import AppBar from './AppBar'
import AppSidebar from './AppSidebar'
import MainRoutes from './MainRoutes'
import { useSocketMessage } from './hooks/useSocketMessage'
import { useUser } from './hooks/useUser'
import { AppHeader, Flex, Waiting } from './layout'
import LoginModal from './user/AuthModal'

import '@fontsource/spectral'

const AppFrame = () => {
  const { user, isLoading, isLoggedIn } = useUser()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useSocketMessage((payload) => {
    enqueueSnackbar(`New story: ${payload.title}`, { variant: 'success' })
  }, 'story-create')

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
          {isLoggedIn && <Waiting>{!isLoading && <MainRoutes />}</Waiting>}
        </Flex>
      </Box>
      <LoginModal
        open={open}
        setClosed={handleClose}
        onLoginSuccess={handleClose}
      />
      <SnackbarProvider
        action={(snackbarId) => (
          <IconButton onClick={() => closeSnackbar(snackbarId)}>
            <CloseIcon />
          </IconButton>
        )}
      />
    </Box>
  )
}

export default AppFrame
