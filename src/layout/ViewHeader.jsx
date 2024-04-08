import { Typography } from '@mui/material'
import Flex from './Flex'

const ViewHeader = ({ children }) => {
  let descendants = children

  if (typeof children === 'string') {
    descendants = (
      <Typography variant="h6" component="div">
        {children}
      </Typography>
    )
  } else {
    descendants = (
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        {children}
      </Flex>
    )
  }

  return (
    <Flex width="100%" justifyContent="center" alignItems="center" py={2}>
      {descendants}
    </Flex>
  )
}

export default ViewHeader
