import Flex from './Flex'
import { IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AppHeader from './AppHeader'

const DrawerContent = ({ children, onRequestClose, title }) => {
  return (
    <Flex flexColumn minWidth="400px">
      <AppHeader isBar>
        <Flex
          flexRow
          alignItems="center"
          justifyContent="space-between"
          pl={1}
          pr={2}
        >
          <IconButton color="inherit" onClick={onRequestClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
        </Flex>
      </AppHeader>
      <Flex flexColumn p={2}>
        {children}
      </Flex>
    </Flex>
  )
}

export default DrawerContent
