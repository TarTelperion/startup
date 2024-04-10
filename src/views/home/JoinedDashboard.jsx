// External Dependencies
// Absolute Dependencies
// Relative Dependencies

import { useJoinedStories } from '../../hooks/stories/useJoinedStories'
import { Flex } from '../../layout'
import MiniStoryRow from '../stories/MiniStoryRow'
import { DashHeader } from './DashHeader'

const JoinedDashboard = ({ user }) => {
  const { stories } = useJoinedStories(user._id)
  return (
    <Flex flexColumn>
      <DashHeader title="Joined Stories" />
      <Flex flexColumn sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
        {stories.map((story) => (
          <MiniStoryRow story={story} key={story._id} showTurn />
        ))}
      </Flex>
    </Flex>
  )
}

export default JoinedDashboard
