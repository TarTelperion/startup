import { useOwnedStories } from '../../hooks/stories/useOwnedStories'
import { Flex } from '../../layout'
import MiniStoryRow from '../stories/MiniStoryRow'
import { useSelectedStoryStore } from '../stories/hooks/selectedStoryStore'
import { DashHeader } from './DashHeader'

const OwnedDashboard = ({ user }) => {
  const { stories } = useOwnedStories(user._id)

  const setSelectedStory = useSelectedStoryStore(
    (store) => store.setSelectedStory
  )

  return (
    <Flex flexColumn>
      <DashHeader title="Owned Stories" />
      <Flex flexColumn sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
        {stories.map((story) => (
          <MiniStoryRow
            story={story}
            key={story._id}
            showTurn={story.writer === user._id}
            onClickRow={setSelectedStory}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default OwnedDashboard
