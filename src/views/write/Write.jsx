import { Typography, Paper } from '@mui/material'
import { useState } from 'react'
import { Flex, ViewHeader } from '../../layout'
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
    height: '85vh', // You can adjust height as per your requirement
    fontFamily: 'Spectral',
    resize: 'none', // Disable textarea resizing
    outline: 'none',
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
      <Flex width="100%" height="85vh" flexColumn>
        <Flex>
          <textarea style={paperStyle}></textarea>
        </Flex>
        <WriteOptions />
      </Flex>
    </>
  )
}
export default Write
