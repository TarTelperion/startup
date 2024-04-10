import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { EdgyPaper, Flex, ViewHeader } from '../../layout'

const Write = () => {
  const params = useParams()
  console.log('params:', params)
  const storyId = params.storyId

  const story = {
    title: 'roochie bums',
    content: 'furble floble beeble buzz, floogle flork rubble crubble.',
    recent: 'floogle flork rubble crubble',
    genre: 'realistic fiction',
    authors: 6,
    writer: 'lord roochiepants',
  }

  const paperStyle = {
    pt: 3,
    pr: 3,
    pl: 3,
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    fontFamily: 'Spectral',
    resize: 'none', // Disable textarea resizing
    outline: 'none',
    border: 'none',
    overflow: 'auto',
  }

  return (
    <Flex flexColumn>
      <ViewHeader>
        <Typography variant="h6" component="div">
          Write
        </Typography>
        <Typography variant="h5" component="div">
          <i>{story?.title}</i>
        </Typography>
      </ViewHeader>
      <Flex flexColumn id="write-main">
        <EdgyPaper sx={{ width: '100%' }} elevation={4}>
          <Flex flexColumn p={3} id="edgy-paper-child">
            <textarea style={paperStyle}></textarea>
          </Flex>
        </EdgyPaper>
      </Flex>
      {/* <WriteOptions /> */}
    </Flex>
  )
}
export default Write
