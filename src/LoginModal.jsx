import * as React from 'react'
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const LoginModal = ({ open, onRequestLogin }) => {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          const formJson = Object.fromEntries(formData.entries())
          const email = formJson.email
          const name = formJson.name
          const passwd = formJson.password

          const payload = {
            name: name,
            pass: passwd,
            mail: email,
          }
          onRequestLogin(payload)
        },
      }}
    >
      <DialogTitle>Log In or Sign Up</DialogTitle>
      <DialogContentText>
        Welcome to Writers' Block, please enter your name, e mail, and password
        to log in.
      </DialogContentText>
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
      />
      <DialogActions>
        <Button onClick={() => console.log('closed')}>Cancel</Button>
        <Button onClick={() => console.log('submitted')} type="submit">
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default LoginModal
