import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useJoinedStories } from '../../hooks/stories/useJoinedStories'
import { useUser } from '../../hooks/useUser'
import { Flex, ViewHeader } from '../../layout'
import StoryList from './StoryList'

const Owned = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { stories } = useJoinedStories(user._id)

  return (
    <>
      <ViewHeader>
        <Flex flexRow justifyContent="space-between">
          <Typography variant="h6">My Stories</Typography>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={() => {
              navigate('/stories/join')
            }}
          >
            Find Story
          </Button>
        </Flex>
      </ViewHeader>
      <StoryList stories={stories} />
    </>
  )
}

export default Owned
