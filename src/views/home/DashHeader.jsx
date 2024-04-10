import { Typography, alpha, useTheme } from '@mui/material'
import { Flex } from '../../layout'

export const DashHeader = ({ title }) => {
  const theme = useTheme()
  return (
    <Flex
      width="100%"
      justifyContent="center"
      py={1}
      sx={{
        backgroundColor: alpha(theme.palette.info.light, 0.7),
        borderBottom: `1px solid ${theme.palette.info.main}`,
      }}
    >
      <Typography variant="subtitle2" align="center">
        {title}
      </Typography>
    </Flex>
  )
}
