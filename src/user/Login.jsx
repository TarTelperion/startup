import { useState } from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Stack,
} from '@mui/material'
import { useUser } from '../hooks/useUser'
import LoginErrorPopper from './LoginErrorPopper'

const Login = ({ onComplete }) => {
  const { login } = useUser()

  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [anchor, setAnchor] = useState(null)
  const [open, setOpen] = useState(false)

  const handleCancel = () => {
    setName('')
    setPass('')
    onComplete()
  }

  const handleSubmit = async (e) => {
    try {
      await login({ name, pass })
    } catch (err) {
      setOpen(true)
      setAnchor(e.target)
      return
    }
    onComplete()
  }

  return (
    <>
      <DialogTitle>Log In</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            "Welcome to Writers' Block, please enter your name or email, and your password to log in."
          }
        </DialogContentText>
        <Stack direction="column">
          <TextField
            autoFocus
            required
            margin="dense"
            name="name"
            label="Username or Email"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <TextField
            required
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
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
          color="primary"
          onClick={(e) => {
            handleSubmit(e)
          }}
          disabled={!name || !pass}
        >
          Log In
        </Button>
        <LoginErrorPopper open={open} anchorEl={anchor} setOpen={setOpen} />
      </DialogActions>
    </>
  )
}

export default Login
