import { List, ListItem, Popover, Paper, Typography } from '@mui/material'

const UserNotifications = ({ user, open, anchor, setOpen }) => {
  console.log('UserNotifications:user', user)

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      sx={{ zIndex: '1600' }}
      anchorOrigin={{
        vertical: 52,
        horizontal: 'left',
      }}
      onClose={() => {
        setOpen(false)
      }}
    >
      <Paper elevation={20} sx={{ backgroundColor: 'primary.lightest' }}>
        <Typography
          variant="h5"
          textAlign={'center'}
          sx={{
            backgroundColor: 'secondary.light',
            color: 'white',
            paddingX: 3,
            paddingY: 1,
            fontWeight: 'bold',
          }}
        >
          Notifications
        </Typography>
        <List>
          {user?.notifications.map((notification, index) => {
            return <ListItem key={index}>{notification}</ListItem>
          })}
        </List>
      </Paper>
    </Popover>
  )
}

export default UserNotifications
