import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles'
import Flex from './Flex'

const Header = styled(Flex)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  color: 'white',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppHeader = ({ isBar, ...props }) => {
  const theme = useTheme()
  return (
    <Header
      {...props}
      sx={{ backgroundColor: isBar ? theme.palette.primary.main : 'inherit' }}
      {...(isBar ? { boxShadow: 1 } : {})}
    />
  )
}

export default AppHeader
