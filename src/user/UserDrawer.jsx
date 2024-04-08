import {
  Drawer,
  Paper,
  Button,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { DrawerContent } from '../layout'
import { useUser } from '../hooks/useUser'
import { Flex } from '../layout'

const UserDrawer = ({ open, setOpen }) => {
  const theme = useTheme()
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
        <Flex flexColumn spacing={2}>
          <Card>
            <Flex flexRow py={2} px={3} justifyContent="space-between">
              <Typography
                variant="subtitle2"
                component="div"
                color={theme.palette.grey[600]}
              >
                Username
              </Typography>
              <Typography variant="subtitle2" component="div">
                {user?.name}
              </Typography>
            </Flex>
          </Card>
          <Card>
            <Flex flexRow py={2} px={3} justifyContent="space-between">
              <Typography
                variant="subtitle2"
                component="div"
                color={theme.palette.grey[600]}
              >
                Email
              </Typography>
              <Typography variant="subtitle2" component="div">
                {user?.mail}
              </Typography>
            </Flex>
          </Card>
          <Card>
            <Flex flexRow py={2} px={3} justifyContent="space-between">
              <Typography
                variant="subtitle2"
                component="div"
                color={theme.palette.grey[600]}
              >
                Stories Joined
              </Typography>
              <Typography variant="subtitle2" component="div">
                {user?.joined?.length}
              </Typography>
            </Flex>
          </Card>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleLogout}
            mt={3}
          >
            Log Out
          </Button>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default UserDrawer
