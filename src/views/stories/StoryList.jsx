import { Chip, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { Flex } from '../../layout'
import StoryListModal from './StoryListModal'
import { useSelectedStoryStore } from './hooks/selectedStoryStore'

const StoryList = ({ stories }) => {
  const theme = useTheme()

  const selectedStory = useSelectedStoryStore((state) => state.selectedStory)
  const setSelectedStory = useSelectedStoryStore(
    (state) => state.setSelectedStory
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [paperOpen, setPaperOpen] = useState(false)

  useEffect(() => {
    if (selectedStory) {
      setModalOpen(true)
      setPaperOpen(true)
    } else {
      setPaperOpen(false)
      setTimeout(() => setModalOpen(false), 250)
    }
  }, [selectedStory])

  const handleSelectStory = (story) => {
    setSelectedStory(story)
  }

  const handleClearStory = () => {
    setSelectedStory(null)
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
          onClick={() => handleSelectStory(story)}
        >
          <Flex
            flexRow
            width="100%"
            key={index}
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
              />
            </Flex>
            <Flex flexColumn alignItems="flex-end">
              <Typography variant="subtitle2">
                {story.authors === 1 ? '1 Author' : `${story.authors} Authors`}
              </Typography>
            </Flex>
          </Flex>
        </Paper>
      ))}
      <StoryListModal
        onRequestClose={handleClearStory}
        modalOpen={modalOpen}
        paperOpen={paperOpen}
        currentStory={selectedStory}
      />
    </Flex>
  )
}

export default StoryList
