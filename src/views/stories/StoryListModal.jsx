import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
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
import { useJoinStory } from '../../hooks/stories/useJoinStory'
import { useLeaveStory } from '../../hooks/stories/useLeaveStory'
import { useUser } from '../../hooks/useUser'
import { EdgyPaper, Flex, ViewHeader } from '../../layout'

const StoryListModal = ({
  modalOpen,
  onRequestClose,
  paperOpen,
  currentStory,
}) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { join } = useJoinStory()
  const { leave } = useLeaveStory()
  const { user } = useUser()

  console.log('user', user)

  const canJoin =
    currentStory && !currentStory?.isOwner && !currentStory?.isJoined

  const canWrite =
    (currentStory && currentStory?.isOwner) || currentStory?.isJoined

  const canLeave =
    currentStory &&
    (currentStory?.isOwner ||
      currentStory.joined.includes(user._id) ||
      user.joined.includes(currentStory._id))

  let actions = []
  if (canJoin) {
    actions = [
      <Button
        key="join"
        variant="contained"
        color="secondary"
        endIcon={<AddCircleIcon />}
        onClick={() => {
          join(currentStory._id)
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
          navigate(`/stories/write/${currentStory._id}`)
        }}
      >
        Write
      </Button>,
    ]
  } else if (canLeave) {
    actions.push(
      <Button
        key="leave"
        variant="contained"
        color="primary"
        endIcon={<DirectionsRunIcon />}
        onClick={() => {
          leave(currentStory._id)
        }}
      >
        Join
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
            <ViewHeader>{currentStory?.title}</ViewHeader>
          </Flex>
          <Divider />
          <Stack spacing={2} pt={2} px={4} pb={2}>
            <Flex alignItems="center" justifyContent="space-between">
              <Chip
                size="large"
                icon={
                  currentStory?.authors > 1 ? <GroupsIcon /> : <PersonIcon />
                }
                label={
                  currentStory?.authors === 1
                    ? '1 Author'
                    : `${currentStory?.authors} Authors`
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
              <Typography variant="body">{currentStory?.genre}</Typography>
            </Flex>
            <Flex flexDirection="column">
              <Typography variant="subtitle2">Prompt</Typography>
              <Typography variant="body">
                {currentStory?.prompt
                  ? currentStory?.prompt
                  : 'This story was generated without a prompt'}
              </Typography>
            </Flex>
          </Stack>
          {currentStory?.content === ' ' && (
            <Flex flexColumn alignItems="center">
              <Typography fontWeight="700" mt={6}>
                {
                  'This story is empty. Click "Join" to change this unfortunate situation.'
                }
              </Typography>
            </Flex>
          )}
          {currentStory?.content !== ' ' && (
            <Flex flexColumn alignItems="flex-start" px={4}>
              <Typography variant="subtitle2">Story</Typography>
              <Typography>{currentStory?.content}</Typography>
            </Flex>
          )}
        </EdgyPaper>
      </Flex>
    </Modal>
  )
}
export default StoryListModal
