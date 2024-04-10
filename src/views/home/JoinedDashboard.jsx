// External Dependencies
// Absolute Dependencies
import { List } from '@mui/material'
// Relative Dependencies

import { useMyStories } from '../../hooks/stories/useMyStories'
import { Flex } from '../../layout'
import MiniStoryRow from '../stories/MiniStoryRow'
import { DashHeader } from './DashHeader'

const JoinedDashboard = ({ user }) => {
  const { stories: joinedStories } = useMyStories(user._id)
  return (
    <Flex flexColumn overflow="hidden">
      <DashHeader title="Joined Stories" />
      <List
        sx={{
          overflow: 'scroll',
          maxHeight: 500,
        }}
      >
        {joinedStories.map((story) => (
          <MiniStoryRow story={story} key={story._id} showTurn />
        ))}
      </List>
    </Flex>
  )
}

export default JoinedDashboard
