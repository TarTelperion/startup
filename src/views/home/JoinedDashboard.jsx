import { useJoinedStories } from '../../hooks/stories/useJoinedStories'
import { Flex } from '../../layout'
import MiniStoryRow from '../stories/MiniStoryRow'
import { useSelectedStoryStore } from '../stories/hooks/selectedStoryStore'
import { DashHeader } from './DashHeader'

const JoinedDashboard = ({ user }) => {
  const { stories } = useJoinedStories(user._id)

  const setSelectedStory = useSelectedStoryStore(
    (store) => store.setSelectedStory
  )

  return (
    <Flex flexColumn width="100%">
      <DashHeader title="Joined Stories" />
      <Flex
        flexColumn
        sx={{ width: '100%', overflowX: 'hidden', overflowY: 'scroll' }}
      >
        {stories.map((story) => (
          <MiniStoryRow
            key={story._id}
            story={story}
            showTurn={story.writer === user._id}
            onClickRow={setSelectedStory}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default JoinedDashboard
