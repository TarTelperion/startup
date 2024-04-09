import { CircularProgress } from '@mui/material'
import Flex from './Flex'

const Waiting = ({ children }) => {
  if (!children)
    return (
      <Flex justifyContent="center" alignItems="center" flexColumn>
        <CircularProgress size={100} />
      </Flex>
    )

  return children
}

export default Waiting
