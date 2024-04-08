import { Drawer, Paper, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DrawerContent } from '../layout'
import { useUser } from '../hooks/useUser'
import { Flex } from '../layout'

const UserDrawer = ({ open, setOpen }) => {
  const { user, logout } = useUser()

  const handleLogout = async () => {
    await logout()
    setOpen(false)
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <DrawerContent title={'Profile'} onRequestClose={() => setOpen(false)}>
        <Flex flexColumn justifyContent="space-between">
          <Typography>{user?.name}</Typography>
          <Typography>{user?.email}</Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Log Out
          </Button>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default UserDrawer
