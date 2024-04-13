import { Flex } from '../../layout'
import StoryListModal from './StoryListModal'
import StoryRow from './StoryRow'
import { useSelectedStoryStore } from './hooks/selectedStoryStore'

const StoryList = ({ stories, user }) => {
  const setSelectedStory = useSelectedStoryStore(
    (state) => state.setSelectedStory
  )

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
      <StoryListModal onRequestClose={handleClearStory} />
    </Flex>
  )
}

export default StoryList
