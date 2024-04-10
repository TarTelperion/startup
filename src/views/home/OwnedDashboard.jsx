import { useOwnedStories } from '../../hooks/stories/useOwnedStories'
import { Flex } from '../../layout'
import MiniStoryRow from '../stories/MiniStoryRow'
import { DashHeader } from './DashHeader'

const OwnedDashboard = ({ user }) => {
  const { stories: ownedStories } = useOwnedStories(user._id)

  return (
    <Flex flexColumn>
      <DashHeader title="Owned Stories" />
      <Flex flexColumn sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
        {ownedStories.map((story) => (
          <MiniStoryRow story={story} key={story._id} />
        ))}
      </Flex>
    </Flex>
  )
}

export default OwnedDashboard
