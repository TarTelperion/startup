import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStories } from '../../hooks/stories/useGlobalStories'
import { Flex, ViewHeader } from '../../layout'
import StoryList from './StoryList'

const Join = () => {
  const navigate = useNavigate()
  const { globalStories } = useGlobalStories()
  const [open, setOpen] = useState(false)
  const [story, setStory] = useState({})

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
      <StoryList
        stories={globalStories}
        paperOpen={open}
        setPaperOpen={setOpen}
        currentStory={story}
        setCurrentStory={setStory}
      />
    </>
  )
}

export default Join
