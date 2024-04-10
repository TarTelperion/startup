import { Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DateTime } from 'luxon'
import { Flex } from '../../layout'

const StoryRow = ({ story, onSelect }) => {
  const theme = useTheme()

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        height: 'auto',
        width: '100%',
        px: 3,
        py: 2,
        '&:hover': {
          backgroundColor: theme.palette.grey[100],
          cursor: 'pointer',
        },
      }}
      onClick={onSelect ? () => onSelect(story) : undefined}
    >
      <Flex
        flexRow
        width="100%"
        justifyContent="space-between"
        overflow="hidden"
      >
        <Flex flexColumn>
          <Flex alignItems="baseline">
            <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5 }}>
              {story.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ ml: 1, fontWeight: 700 }}
              color={theme.palette.grey[500]}
            >
              {DateTime.fromISO(story.updatedAt).toRelative()}
            </Typography>
          </Flex>
          <Chip
            label={story.genre}
            size="small"
            sx={{
              width: 'min-content',
              backgroundColor: 'secondary.light',
              color: 'white',
              fontWeight: 'bold',
              mb: 0.5,
            }}
          />
        </Flex>
        <Flex flexDirection="column" flex="0 0 80px" alignItems="flex-end">
          <Typography variant="subtitle2">
            {story.authors === 1 ? '1 Author' : `${story.authors} Authors`}
          </Typography>
        </Flex>
      </Flex>
    </Paper>
  )
}

export default StoryRow
