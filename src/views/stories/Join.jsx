import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUnjoinedStories } from '../../hooks/stories/useUnjoinedStories'
import { useUser } from '../../hooks/useUser'
import { Flex, ViewHeader } from '../../layout'
import StoryList from './StoryList'

const Join = () => {
  const navigate = useNavigate()

  const { user } = useUser()
  const { stories } = useUnjoinedStories(user._id)

  return (
    <>
      <ViewHeader>
        <Flex flexRow justifyContent="space-between">
          <Typography variant="h6">Join a Story</Typography>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={() => {
              navigate('/stories/joined')
            }}
          >
            My Stories
          </Button>
        </Flex>
      </ViewHeader>
      <StoryList stories={stories} user={user} />
    </>
  )
}

export default Join
