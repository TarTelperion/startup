import ClassIcon from '@mui/icons-material/Class'
import GradeIcon from '@mui/icons-material/Grade'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import { Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Flex } from '../../layout'

const MiniStoryRow = ({ story, onClickRow, showTurn }) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
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
      <Flex
        flexRow
        width="100%"
        justifyContent="space-between"
        overflow="hidden"
      >
        <Flex flexColumn justifyContent="space-between">
          <Typography
            variant="subtitle2"
            fontWeight={700}
            lineHeight="1rem"
            sx={{ mb: 1, ml: 0.5 }}
          >
            {story.title}
          </Typography>
          <Flex spacing={0.5} mb={0.5}>
            <Chip
              size="small"
              icon={
                story?.authors > 1 ? (
                  <GroupsIcon color="inherit" sx={{ mb: '1px' }} />
                ) : (
                  <PersonIcon color="inherit" sx={{ mb: '1px' }} />
                )
              }
              label={String(story?.authors ?? 0)}
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
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          {showTurn && (
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

export default MiniStoryRow
