import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles'
import cover from '../assets/funky-lines.png'
import Flex from './Flex'

const Header = styled(Flex)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  color: 'white',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppHeader = ({ isBar, children, sx, funkyLines, ...props }) => {
  const theme = useTheme()

  const styles = {
    ...sx,
    backgroundColor: isBar ? theme.palette.primary.main : 'inherit',
  }

  if (funkyLines) {
    sx.backgroundImage = `url(${cover})`
    sx.backgroundRepeat = 'no-repeat'
    sx.backgroundSize = 'cover'
  }

  return (
    <Header {...props} {...(isBar ? { boxShadow: 1 } : {})} sx={styles}>
      {children}
    </Header>
  )
}

export default AppHeader
