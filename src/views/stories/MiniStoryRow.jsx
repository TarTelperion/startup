import ClassIcon from '@mui/icons-material/Class'
import EditNoteIcon from '@mui/icons-material/EditNote'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import { Button, Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Flex } from '../../layout'

const MiniStoryRow = ({ story, onClickWrite, showTurn }) => {
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
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          {showTurn && (
            <>
              <Typography variant="caption" fontWeight={700}>
                {"It's your turn!"}
              </Typography>
              <Button
                color="primary"
                variant="contained"
                size="small"
                endIcon={<EditNoteIcon color="inherit" />}
                onClick={() => onClickWrite(story._id)}
              >
                Write!
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Paper>
  )
}

export default MiniStoryRow
