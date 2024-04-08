import { useState } from 'react'
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
} from '@mui/material'
import { Margin } from '@mui/icons-material'
import { Flex, ViewHeader } from '../../layout'

const Create = () => {
  const [alertShow, updateAlertShow] = useState(false)
  const [prompt, updatePrompt] = useState(undefined)

  return (
    <>
      <ViewHeader>{'Create a New Story'}</ViewHeader>
      <Flex flexColumn>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            height: '100%',
            width: '100%',
            p: 3,
          }}
          elevation={4}
        >
          <Stack direction="column" spacing={2}>
            <Flex width="100%">
              <Flex flex="3 1 auto" mr={1}>
                <TextField id="outlined-basic" label="Title" fullWidth />
              </Flex>
              <Flex flex="1 1 auto">
                <TextField id="outlined-basic" label="Genre" fullWidth />
              </Flex>
            </Flex>
            <Flex>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => updateAlertShow(!alertShow)}
              >
                Generate Prompt
              </Button>
              <div>{alertShow && <Alert severity="info">{prompt}</Alert>}</div>
            </Flex>
          </Stack>
          <Flex sx={{ alignSelf: 'center', bottom: 0, justifySelf: 'flexEnd' }}>
            <Button variant="filled">Create</Button>
          </Flex>
        </Paper>
      </Flex>
    </>
  )
}

export default Create
