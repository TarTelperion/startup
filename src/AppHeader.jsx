import { Flex } from './layout'
import styled from '@emotion/styled'

const Header = styled(Flex)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  // backgroundColor: theme.palette.primary.main,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppHeader = (props) => {
  return <Header {...props} />
}

export default AppHeader
