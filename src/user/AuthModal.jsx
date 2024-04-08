import { useState } from 'react'
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Stack,
  Box,
  Tabs,
  Tab,
} from '@mui/material'
import Login from './Login'
import CreateAccount from './CreateAccount'
import { Flex } from '../layout'
import { Create } from '@mui/icons-material'

const AuthModal = ({ open, onLoginSuccess, setClosed }) => {
  const [view, setView] = useState('login')

  const handleTabChange = (e, value) => {
    setView(value)
  }

  return (
    <Dialog open={open} onClose={setClosed}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onChange={handleTabChange} value={view}>
          <Tab label="Log In" value="login" />
          <Tab label="Sign Up" value="create" />
        </Tabs>
      </Box>
      <Flex flexColumn minWidth="400px" minHeight="400px">
        {view === 'login' && <Login onComplete={setClosed} />}
        {view === 'create' && <CreateAccount onComplete={setClosed} />}
      </Flex>
    </Dialog>
  )
}
export default AuthModal
