import LightBulbIcon from '@mui/icons-material/EmojiObjects'
import { Chip, Paper, Popover, Typography } from '@mui/material'
import { useState } from 'react'
import { Flex } from '../../layout'

const StoryDetails = ({ story }) => {
  const { additions } = story

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleOpen = (event) => setAnchorEl(event.currentTarget)

  return (
    <Flex flexDirection="column">
      <Flex width="100%" justifyContent="space-between">
        <Typography variant="subtitle2">Recent Additions</Typography>
        <Chip
          color="secondary"
          icon={<LightBulbIcon />}
          label={'View Story Details'}
          sx={{ fontWeight: 700, fontSize: '0.9rem', px: 1, color: 'white' }}
          onClick={handleOpen}
        />
      </Flex>
      {additions.map((content) => (
        <Paper
          key={content.createdAt}
          variant="outlined"
          sx={{ display: 'flex', flexDirection: 'column' }}
        ></Paper>
      ))}
      {additions.length === 0 && (
        <Typography
          variant="body1"
          align="center"
          fontWeight={700}
          color="secondary"
        >
          No recent additions
        </Typography>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '300px',
            maxWidth: '500px',
            minHeight: '100px',
            px: 2,
            pt: 2,
            pb: 3,
          }}
        >
          <Typography variant="h6">Genre</Typography>
          <Typography variant="body1">{story.genre}</Typography>
          <Typography variant="h6">Prompt</Typography>
          <Typography variant="body1">{story.prompt}</Typography>
        </Paper>
      </Popover>
    </Flex>
  )
}

export default StoryDetails
