import { List, ListItem, Popper, Paper, Typography } from '@mui/material'

const UserNotifications = ({ user, open, anchor }) => {
  console.log('UserNotifications:user', user)

  return (
    <Popper
      open={open}
      anchorEl={anchor}
      sx={{ zIndex: '1600' }}
      placement="bottom"
    >
      <Paper>
        <Typography variant="h6" textAlign={'center'}>
          Notifications:
        </Typography>
        <List>
          {user?.notifications.map((notification, index) => {
            return <ListItem key={index}>{notification}</ListItem>
          })}
        </List>
      </Paper>
    </Popper>
  )
}

export default UserNotifications
