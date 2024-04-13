import LightBulbIcon from '@mui/icons-material/EmojiObjects'
import WavingHandIcon from '@mui/icons-material/WavingHand'
import { Chip, Paper, Popover, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { usePesterAuthor } from '../../hooks/stories/usePesterAuthor'
import { Flex } from '../../layout'
import StoryAddition from '../stories/StoryAddition'

const StoryDetails = ({ story, isMyTurn }) => {
  const { additions } = story

  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { pester } = usePesterAuthor()
  const handleOpen = (event) => setAnchorEl(event.currentTarget)

  return (
    <Flex flexColumn>
      <Flex width="100%" justifyContent="space-between" mb={0}>
        <Typography variant="subtitle2" ml={0.5}>
          Recent Additions
        </Typography>
        <Flex flexDirection="column">
          <Chip
            color="secondary"
            icon={<LightBulbIcon />}
            label={'View Story Details'}
            sx={{ fontWeight: 700, fontSize: '0.9rem', px: 1, color: 'white' }}
            onClick={handleOpen}
          />
          <Chip
            color="success"
            icon={<WavingHandIcon />}
            label={'Pester The Author'}
            sx={{
              fontWeight: 700,
              fontSize: '0.9rem',
              px: 1,
              backgroundColor: '#66AB95',
              color: 'white',
              mt: 1,
            }}
            onClick={() => pester(story._id)}
            disabled={isMyTurn}
          />
        </Flex>
      </Flex>
      {additions.length > 0 && (
        <>
          <Typography
            variant="caption"
            fontWeight={700}
            color={theme.palette.grey[500]}
            ml={0.5}
          >{`Plus ${additions.length - 1} prior addition${additions.length - 1 > 1 ? 's' : ''}...`}</Typography>
          <Flex flexDirection="column" spacing={1}>
            {additions.slice(-2).map((addition) => {
              return (
                <StoryAddition addition={addition} key={addition.updatedAt} />
              )
            })}
          </Flex>
        </>
      )}
      {additions.length === 0 && (
        <Typography
          variant="body1"
          align="center"
          fontWeight={700}
          color="secondary"
        >
          No contributions yet
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
