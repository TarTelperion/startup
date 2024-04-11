import { Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStory } from '../../hooks/stories/useStory'
import { useUser } from '../../hooks/useUser'
import { EdgyPaper, Flex, ViewHeader, Waiting } from '../../layout'
import StoryDetails from './StoryDetails'
import WriteOptions from './WriteOptions'

const Write = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const params = useParams()

  const storyId = params.storyId

  const { user } = useUser()
  const { story, update, skip } = useStory({ userId: user._id, storyId })
  const isMyTurn = story?.writer === user._id

  const [storyContent, setStoryContent] = useState('')

  const handleSave = async () => {
    await update({ content: storyContent })
    navigate('/stories/joined')
  }
  const handleSkip = async () => {
    await skip()
    navigate('/stories/joined')
  }

  const textareaStyle = {
    pt: 3,
    pr: 3,
    pl: 3,
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    fontFamily: 'Spectral',
    fontSize: '1rem',
    resize: 'none', // Disable textarea resizing
    outline: 'none',
    overflow: 'auto',
    border: 'none',
  }

  return (
    <Flex flexColumn>
      <ViewHeader>
        <Typography variant="h6" component="div">
          Write
        </Typography>
        <Typography variant="h6" component="div">
          {story?.title}
        </Typography>
      </ViewHeader>
      <Waiting>
        {story && (
          <>
            <Flex flexColumn id="write-main">
              <EdgyPaper sx={{ width: '100%' }} elevation={4}>
                <Flex flexColumn p={3} id="edgy-paper-child">
                  <StoryDetails story={story} />
                  <Flex flexColumn mt={3}>
                    <Flex
                      id="textarea-container"
                      flexColumn
                      sx={{
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                      }}
                    >
                      <textarea
                        disabled={!isMyTurn}
                        placeholder={
                          isMyTurn
                            ? 'Write some wise words here...'
                            : 'Waiting for other contributions...'
                        }
                        style={textareaStyle}
                        value={storyContent}
                        onChange={(e) => setStoryContent(e.target.value)}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </EdgyPaper>
            </Flex>
            <WriteOptions
              onClickSave={handleSave}
              onClickSkip={handleSkip}
              disabled={!isMyTurn}
            />
          </>
        )}
      </Waiting>
    </Flex>
  )
}
export default Write
