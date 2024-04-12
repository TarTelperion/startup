import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import EditNoteIcon from '@mui/icons-material/EditNote'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useStory } from '../../hooks/stories/useStory'
import { useUser } from '../../hooks/useUser'
import { EdgyPaper, Flex, ViewHeader, Waiting } from '../../layout'
import StoryAddition from './StoryAddition'

const StoryListModal = ({
  modalOpen,
  onRequestClose,
  paperOpen,
  currentStory,
}) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const { user } = useUser()
  const { story, join, leave, remove } = useStory(
    { storyId: currentStory?._id },
    { fallbackData: currentStory }
  )

  const canJoin = story && !story?.isOwner && !story?.isJoined

  const canWrite = (story && story?.isOwner) || story?.isJoined

  const canLeave =
    story &&
    !story?.isOwner &&
    (story.joined.includes(user._id) || user.joined.includes(story._id))

  const canDelete = story && story?.isOwner

  let actions = []
  if (canJoin) {
    actions = [
      <Button
        key="join"
        variant="contained"
        color="secondary"
        endIcon={<AddCircleIcon />}
        onClick={async () => {
          await join(story._id)
          onRequestClose()
          navigate('/stories/joined')
        }}
      >
        Join
      </Button>,
    ]
  } else if (canWrite) {
    actions = [
      <Button
        key="write"
        variant="contained"
        color="primary"
        endIcon={<EditNoteIcon />}
        onClick={() => {
          navigate(`/stories/write/${story._id}`)
          onRequestClose()
        }}
      >
        Write
      </Button>,
    ]
  }
  if (canLeave) {
    actions.push(
      <Button
        key="leave"
        variant="contained"
        color="secondary"
        endIcon={<DirectionsRunIcon />}
        onClick={async () => {
          await leave(story._id)
        }}
      >
        Leave
      </Button>
    )
  }
  if (canDelete) {
    actions.push(
      <Button
        key="delete"
        variant="contained"
        color="error"
        endIcon={<DeleteForeverIcon />}
        onClick={async () => {
          await remove(story._id)
          onRequestClose()
        }}
      >
        Delete
      </Button>
    )
  }

  return (
    <Modal
      open={modalOpen}
      onClose={onRequestClose}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        mt: 2,
        mx: 10,
        outline: 0,
      }}
      closeAfterTransition
      hideBackdrop
    >
      <Flex flexColumn width="100%" height="100%">
        <EdgyPaper
          open={paperOpen}
          transition={true}
          sx={{
            position: 'relative',
            outline: 0,
          }}
        >
          <Box
            position="absolute"
            sx={{ top: '18px', right: '18px', zIndex: 1500 }}
          >
            <IconButton size="small" onClick={onRequestClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Flex
            width="100%"
            sx={{
              backgroundColor: theme.palette.success.light,
            }}
          >
            <ViewHeader>{story?.title}</ViewHeader>
          </Flex>
          <Divider />
          <Waiting loading={!story}>
            {story && (
              <>
                <Stack spacing={2} pt={2} px={4} pb={2}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Chip
                      size="large"
                      icon={
                        story?.authors > 1 ? <GroupsIcon /> : <PersonIcon />
                      }
                      label={
                        story?.authors <= 1
                          ? story.authors === 1
                            ? '1 Author'
                            : '0 Authors'
                          : `${story?.authors} Authors`
                      }
                    />
                    <Flex>
                      {actions.map((action, index) => (
                        <Box key={index} ml={1}>
                          {action}
                        </Box>
                      ))}
                    </Flex>
                  </Flex>
                  <Flex flexDirection="column">
                    <Typography variant="subtitle2">Genre</Typography>
                    <Typography variant="body">{story?.genre}</Typography>
                  </Flex>
                  <Flex flexDirection="column">
                    <Typography variant="subtitle2">Prompt</Typography>
                    <Typography variant="body">
                      {story?.prompt
                        ? story?.prompt
                        : 'This story was generated without a prompt'}
                    </Typography>
                  </Flex>
                </Stack>
                {story?.content === ' ' && (
                  <Flex flexColumn alignItems="center">
                    <Typography fontWeight="700" mt={6}>
                      {
                        'This story is empty. Click "Join" to change this unfortunate situation.'
                      }
                    </Typography>
                  </Flex>
                )}
                {story?.content !== ' ' && (
                  <Flex
                    flexColumn
                    alignItems="flex-start"
                    px={4}
                    spacing={1}
                    overflow="scroll"
                  >
                    <Typography variant="subtitle2" overflow={'scroll'}>
                      Story
                    </Typography>
                    {story?.additions?.map((addition) => (
                      <StoryAddition
                        addition={addition}
                        key={addition.updatedAt}
                      />
                    ))}
                  </Flex>
                )}
              </>
            )}
          </Waiting>
        </EdgyPaper>
      </Flex>
    </Modal>
  )
}
export default StoryListModal
