import { Button, Typography } from '@mui/material'
import { useJoinedStories } from '../../hooks/stories/useJoinedStories'
import { Flex, ViewHeader } from '../../layout'
import StoryList from './StoryList'

const Owned = () => {
  const { stories } = useJoinedStories()

  return (
    <>
      <ViewHeader>
        <Flex flexRow justifyContent="space-between">
          <Typography variant="h6">My Stories</Typography>
          <Button size="small" color="secondary" variant="outlined">
            Find Story
          </Button>
        </Flex>
      </ViewHeader>
      <StoryList stories={stories} />
    </>
  )
}

export default Owned
