import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  Chip,
  Divider,
  IconButton,
  Modal,
  Paper,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useState } from 'react'
import { Flex, ViewHeader } from '../../layout'
import EdgyPaper from '../../layout/EdgyPaper'

const StoryList = ({
  stories,
  paperOpen,
  setPaperOpen,
  currentStory,
  setCurrentStory,
}) => {
  console.log('stories2', stories)
  const [modalOpen, setModalOpen] = useState(false)
  const theme = useTheme()

  const handleClick = (story) => {
    setModalOpen(true)
    setPaperOpen(true)
    setCurrentStory(story)
  }
  const handleClose = () => {
    setPaperOpen(false)
    setTimeout(() => setModalOpen(false), 300)
    setCurrentStory({})
  }

  return (
    <Flex flexColumn width="100%" spacing={1}>
      {stories.map((story, index) => (
        <Paper
          variant="outlined"
          key={index}
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
          onClick={() => handleClick(story)}
        >
          <Flex
            flexRow
            width="100%"
            key={story.index}
            justifyContent="space-between"
            overflow="hidden"
          >
            <Flex flexColumn>
              <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
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
                }}
              ></Chip>
            </Flex>
            <Flex flexColumn alignItems="flex-end">
              <Typography variant="subtitle2">
                {story.authors === 1 ? '1 Author' : `${story.authors} Authors`}
              </Typography>
            </Flex>
          </Flex>
        </Paper>
      ))}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          marginTop: '10px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        <Flex width="75%">
          <EdgyPaper
            open={paperOpen}
            transition={true}
            sx={{
              width: '50%',
            }}
          >
            <ViewHeader>{currentStory.title}</ViewHeader>
            <Divider variant="middle" />
            <Flex
              flexRow
              alignItems="center"
              justifyContent="space-between"
              pl={1}
              pr={2}
            >
              <Typography marginLeft={10} marginTop={5}>
                Genre: {currentStory.genre} <br />
                {currentStory.authors === 1
                  ? '1 Author'
                  : `${currentStory.authors} Authors`}{' '}
              </Typography>
              <Flex sx={{ float: 'right' }}>
                <IconButton size="large" color="secondary">
                  <AddCircleIcon fontSize="inherit" />
                </IconButton>
              </Flex>
            </Flex>
            <Flex width="100%" sx={{ bottom: 0 }} flexColumn>
              <Flex
                width="100%"
                sx={{ alignSelf: 'center', marginTop: 10 }}
                flexColumn
              >
                <Typography align="center">
                  {currentStory.content !== ' '
                    ? currentStory.content
                    : 'Nobody has written on this story yet. Click "Join" to change that unfortunate situation'}
                </Typography>
              </Flex>
            </Flex>
          </EdgyPaper>
        </Flex>
      </Modal>
    </Flex>
  )
}

export default StoryList
