import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMyStories } from '../../hooks/stories/useMyStories'
import { useUser } from '../../hooks/useUser'
import { Flex, ViewHeader } from '../../layout'
import StoryList from './StoryList'

const Owned = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { stories } = useMyStories(user._id)
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
              navigate('/stories/find')
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
