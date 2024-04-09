import { Typography } from '@mui/material'
import { Flex, ViewHeader } from '../../layout'
import EdgyPaper from '../../layout/EdgyPaper'
import WriteOptions from './WriteOptions'

const Write = () => {
  const story = {
    title: 'roochie bums',
    content: 'furble floble beeble buzz, floogle flork rubble crubble.',
    recent: 'floogle flork rubble crubble',
    genre: 'realistic fiction',
    authors: 6,
    writer: 'lord roochiepants',
  }
  const paperStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    height: '87vh',
    fontFamily: 'Spectral',
    resize: 'none', // Disable textarea resizing
    outline: 'none',
    overflow: 'auto',
  }

  return (
    <>
      <ViewHeader>
        <Typography variant="h6" component="div">
          Write
        </Typography>
        <Typography variant="h5" component="div">
          <i>{story?.title}</i>
        </Typography>
      </ViewHeader>
      <Flex>
        <EdgyPaper sx={{ width: '100%' }} elevation={4}>
          <textarea style={paperStyle}></textarea>
        </EdgyPaper>
      </Flex>
      <WriteOptions />
    </>
  )
}
export default Write
