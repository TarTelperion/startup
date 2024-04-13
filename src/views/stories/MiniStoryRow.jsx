import ClassIcon from '@mui/icons-material/Class'
import GradeIcon from '@mui/icons-material/Grade'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import { Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Flex, RelativeTime } from '../../layout'

const MiniStoryRow = ({ story, onClickRow, showTurn }) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: '90px',
        px: 2,
        py: 2,
        overflow: 'hidden',
        transition: 'background-color 0.3s',
        '&:hover': {
          transition: 'background-color 0.3s',
          backgroundColor: theme.palette.grey[100],
          cursor: 'pointer',
        },
      }}
      onClick={onClickRow ? () => onClickRow(story) : undefined}
    >
      <Flex alignItems="center" justifyContent="space-between" px={0.5}>
        <Flex>
          <Typography variant="subtitle2" fontWeight={700} lineHeight="1rem">
            {story.title}
          </Typography>
        </Flex>
        <Flex>
          <RelativeTime value={story.updatedAt} />
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="row" spacing={0.5}>
          <Chip
            size="small"
            icon={
              story?.authors > 1 ? (
                <GroupsIcon color="inherit" sx={{ mb: '1px' }} />
              ) : (
                <PersonIcon color="inherit" sx={{ mb: '1px' }} />
              )
            }
            label={
              <Typography
                component="div"
                variant="caption"
                color="inherit"
                fontSize="inherit"
                fontWeight="inherit"
                sx={{ mt: '2px' }}
              >
                {story.authors}
              </Typography>
            }
            sx={{
              backgroundColor: 'info.light',
              color: 'white',
              fontWeight: 700,
              px: 0.5,
              fontSize: '0.78rem',
              width: '52px',
            }}
          />
          <Chip
            label={story.genre}
            size="small"
            icon={<ClassIcon color="inherit" />}
            sx={{
              backgroundColor: 'secondary.light',
              color: 'white',
              fontWeight: 'bold',
              px: 0.5,
              fontSize: '0.75rem',
              maxWidth: '120px',
            }}
          />
        </Flex>
        <Flex>
          {showTurn && (
            <Chip
              color="success"
              icon={<GradeIcon />}
              label={'My Turn'}
              sx={{ px: 0.5, fontWeight: 700, color: 'white' }}
              size="small"
            />
          )}
        </Flex>
      </Flex>
    </Paper>
  )
}

export default MiniStoryRow
