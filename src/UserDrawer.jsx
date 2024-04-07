import { Drawer, Paper, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DrawerContent } from './layout'
import { useUser } from './hooks/useUser'
import { Flex } from './layout'

const UserDrawer = ({ open, setOpen }) => {
  const navigate = useNavigate()
  const { user } = useUser()

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
          <Button variant="outlined" color="secondary">
            Log Out
          </Button>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default UserDrawer
