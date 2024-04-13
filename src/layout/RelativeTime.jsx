import { Typography, useTheme } from '@mui/material'
import { DateTime } from 'luxon'

const RelativeTime = ({ value = '', suffix = ' ago' }) => {
  const theme = useTheme()
  const dateString = DateTime.fromISO(value).toRelative().replace(/ ago$/, '')

  return (
    <Typography
      variant="caption"
      sx={{ ml: 1, fontWeight: 700 }}
      color={theme.palette.grey[500]}
    >
      {dateString + suffix}
    </Typography>
  )
}

export default RelativeTime
