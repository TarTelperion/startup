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
import { useLogin } from './hooks/useLogin'

const LoginModal = ({ open, onLoginSuccess, setClosed }) => {
  const { login } = useLogin()

  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [mail, setMail] = useState('')
  const [value, setValue] = useState(0)

  const handleLogin = async () => {
    try {
      await login({ name, pass })
      onLoginSuccess()
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    setName('')
    setPass('')
    setMail('')
    setClosed()
  }

  return (
    <Dialog open={open} onClose={setClosed}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs>
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      <DialogTitle>{value == 0 ? 'Log In' : 'Sign Up'}</DialogTitle>
      <DialogContent hidden={value !== 0}>
        <DialogContentText>
          Welcome to Writers' Block, please enter your name, email, and password
          to log in.
        </DialogContentText>
        <Stack direction="column">
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Username or Email"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value)
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, mb: 2 }}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleLogin}
          disabled={!name || !pass}
        >
          Log In
        </Button>
      </DialogActions>

      <DialogContent hidden={value !== 1}>
        <DialogContentText>
          Welcome to Writers' Block, please enter your name, email, and password
          to log in.
        </DialogContentText>
        <Stack direction="column">
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Username or Email"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value)
            }}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value)
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, mb: 2 }} hidden={value !== 1}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleLogin}
          disabled={!name || !pass}
        >
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default LoginModal
