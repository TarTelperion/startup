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
import { useCreateAccount } from './hooks/useCreateAccount'

const CreateAccount = ({ onComplete }) => {
  const { create } = useCreateAccount()

  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')

  const handleCancel = () => {
    setName('')
    setPass('')
    setMail('')
    onComplete()
  }

  const handleSubmit = async () => {
    await create({ name: name, mail: mail, pass: pass })
    onComplete()
  }

  return (
    <>
      <DialogTitle>{'Create Account'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            "Welcome to Writers' Block, please enter your name, email, and password"
          }
          to log in.
        </DialogContentText>
        <Stack direction="column">
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Username"
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
            value={mail}
            onChange={(e) => {
              setMail(e.target.value)
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
          color="primary"
          onClick={handleSubmit}
          disabled={!name || !pass || !mail}
        >
          Sign Up
        </Button>
      </DialogActions>
    </>
  )
}

export default CreateAccount
