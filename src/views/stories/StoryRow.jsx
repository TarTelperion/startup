import { Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
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
          <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5 }}>
            {story.title}
          </Typography>
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
        <Flex flexColumn alignItems="flex-end">
          <Typography variant="subtitle2">
            {story.authors === 1 ? '1 Author' : `${story.authors} Authors`}
          </Typography>
        </Flex>
      </Flex>
    </Paper>
  )
}

export default StoryRow
