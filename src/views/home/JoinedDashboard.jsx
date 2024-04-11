// External Dependencies
// Absolute Dependencies
// Relative Dependencies
import { useNavigate } from 'react-router-dom'
import { useJoinedStories } from '../../hooks/stories/useJoinedStories'
import { Flex } from '../../layout'
import MiniStoryRow from '../stories/MiniStoryRow'
import { DashHeader } from './DashHeader'

const JoinedDashboard = ({ user }) => {
  const navigate = useNavigate()
  const { stories } = useJoinedStories(user._id)

  const handleClickWrite = (storyId) => {
    navigate(`/stories/write/${storyId}`)
  }

  return (
    <Flex flexColumn width="100%">
      <DashHeader title="Joined Stories" />
      <Flex
        flexColumn
        sx={{ width: '100%', overflowX: 'hidden', overflowY: 'scroll' }}
      >
        {stories.map((story) => (
          <MiniStoryRow
            story={story}
            key={story._id}
            showTurn={story.writer === user._id}
            onClickWrite={handleClickWrite}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default JoinedDashboard
