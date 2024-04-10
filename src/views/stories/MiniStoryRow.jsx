import ClassIcon from '@mui/icons-material/Class'
import EditNoteIcon from '@mui/icons-material/EditNote'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import { ButtonBase, Chip, Paper, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { Flex } from '../../layout'

const MiniStoryRow = ({ story, onSelect, showTurn }) => {
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
      }}
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
                  <GroupsIcon color="inherit" />
                ) : (
                  <PersonIcon color="inherit" />
                )
              }
              label={
                story?.authors === 1 ? '1 Author' : `${story?.authors} Authors`
              }
              sx={{
                backgroundColor: 'info.light',
                color: 'white',
                fontWeight: 'bold',
                px: 0.5,
                fontSize: '0.75rem',
                width: '98px',
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
                maxWidth: '150px',
              }}
            />
          </Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
          {showTurn && (
            <ButtonBase
              color="primary"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: alpha(theme.palette.primary.main, 0.6),
                color: 'white',
                borderRadius: 2,
                width: '80px',
                height: '100%',
                alignItems: 'center',
                p: 0.75,
                border: '1px solid',
                borderColor: theme.palette.primary.main,
                '&:hover': {
                  transition: 'background-color 0.2s',
                  backgroundColor: alpha(theme.palette.primary.main, 0.8),
                },
                transition: 'background-color 0.2s',
              }}
            >
              <Typography
                fontSize="0.75rem"
                fontWeight={700}
                variant="body2"
                color="inherit"
              >
                My Turn!
              </Typography>
              <EditNoteIcon color="inherit" />
            </ButtonBase>
          )}
          {!showTurn && (
            <Typography variant="body2" mt={0.25}>
              {story.authors === 1 ? '1 Author' : `${story.authors} Authors`}
            </Typography>
          )}
        </Flex>
      </Flex>
    </Paper>
  )
}

export default MiniStoryRow
