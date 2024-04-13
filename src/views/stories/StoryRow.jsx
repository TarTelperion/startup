import GradeIcon from '@mui/icons-material/Grade'
import { Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Flex, RelativeTime } from '../../layout'

const StoryRow = ({ story, onSelect, isMyTurn }) => {
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
        transition: 'background-color 0.3s',
        '&:hover': {
          transition: 'background-color 0.3s',
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
        <Flex flexColumn justifyContent="space-between">
          <Flex alignItems="baseline">
            <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5 }}>
              {story.title}
            </Typography>
            <RelativeTime value={story.updatedAt} />
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
        <Flex
          flexDirection="column"
          flex="0 0 100px"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2" mr={1}>
            {story.authors === 1 ? '1 Author' : `${story.authors} Authors`}
          </Typography>
          {isMyTurn && (
            <Chip
              color="success"
              icon={<GradeIcon />}
              label={'My Turn!'}
              sx={{ px: 0.5, fontWeight: 700, color: 'white' }}
              size="small"
            />
          )}
        </Flex>
      </Flex>
    </Paper>
  )
}

export default StoryRow
