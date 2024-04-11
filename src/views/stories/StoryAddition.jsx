import { Paper, Typography } from '@mui/material'
import { DateTime } from 'luxon'

const StoryAddition = ({ addition }) => {
  const { content, updatedAt, authorName } = addition

  return (
    <Paper
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', py: 1, px: 2 }}
    >
      <Typography
        variant="caption"
        fontWeight={700}
        gutterBottom
      >{`${authorName} wrote ${DateTime.fromISO(updatedAt).toRelative()}:`}</Typography>
      <Typography variant="caption" fontSize="0.95rem">
        {content}
      </Typography>
    </Paper>
  )
}

export default StoryAddition
