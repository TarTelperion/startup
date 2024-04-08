import { Popper, Paper, Box, Alert } from '@mui/material'

const LoginErrorPopper = ({ open, anchorEl, setOpen }) => {
  return (
    <Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        sx={{ zIndex: 1500 }}
        {...setTimeout(() => setOpen(false), 5000)}
      >
        <Alert severity="error">Login failed, try again.</Alert>
      </Popper>
    </Box>
  )
}

export default LoginErrorPopper
