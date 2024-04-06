// External Dependencies
import Box from '@mui/material/Box'

// Absolute Dependencies

// Relative Dependencies

const Flex = ({ children, ...other }) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" {...other}>
      {children}
    </Box>
  )
}

export default Flex
