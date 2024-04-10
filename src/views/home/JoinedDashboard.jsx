// External Dependencies
// Absolute Dependencies
// Relative Dependencies

import { useMyStories } from '../../hooks/stories/useMyStories'
import { Flex } from '../../layout'
import MiniStoryRow from '../stories/MiniStoryRow'
import { DashHeader } from './DashHeader'

const JoinedDashboard = ({ user }) => {
  const { stories: joinedStories } = useMyStories(user._id)
  return (
    <Flex flexColumn>
      <DashHeader title="Joined Stories" />
      <Flex flexColumn sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
        {joinedStories.map((story) => (
          <MiniStoryRow story={story} key={story._id} showTurn />
        ))}
      </Flex>
    </Flex>
  )
}

export default JoinedDashboard
