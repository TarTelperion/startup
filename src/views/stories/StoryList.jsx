import { useEffect, useState } from 'react'
import { Flex } from '../../layout'
import StoryListModal from './StoryListModal'
import StoryRow from './StoryRow'
import { useSelectedStoryStore } from './hooks/selectedStoryStore'

const StoryList = ({ stories, user }) => {
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
    <Flex
      id="story-list"
      flexColumn
      width="100%"
      spacing={1}
      sx={{
        overflowY: 'scroll',
      }}
    >
      {stories.map((story) => (
        <StoryRow
          key={story._id}
          story={story}
          onSelect={handleSelectStory}
          onJoin={handleClearStory}
          isMyTurn={story.writer === user._id}
        />
      ))}
      <StoryListModal
        onRequestClose={handleClearStory}
        modalOpen={modalOpen}
        paperOpen={paperOpen}
        currentStory={selectedStory}
        handleClearStory={handleClearStory}
      />
    </Flex>
  )
}

export default StoryList
