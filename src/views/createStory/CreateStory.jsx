import { useState } from 'react'
import { Paper, TextField, Button, Autocomplete, Stack } from '@mui/material'
import { Flex, ViewHeader } from '../../layout'
import { genreOptions } from './genreOptions'

const Create = () => {
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')

  // const getPrompt = async () => {
  //   console.log(window.location.host)
  //   const result = await get('/api?words=10', {
  //     hostname: 'https://random-word-api.vercel.app',
  //     header: {
  //       'Access-Control-Allow-Origin': window.location.host,
  //     },
  //   })
  //   console.log(result)
  //   let temp = ''
  //   for (let i = 0; i < result.length; i++) {
  //     if (i < result.length - 1) {
  //       temp = temp.concat(result[i])
  //       temp = temp.concat(', ')
  //     } else {
  //       temp = temp.concat(result[i])
  //       temp = temp.concat('.')
  //     }
  //   }
  //   let first = temp.charAt(0).toUpperCase()
  //   let rest = temp.replace(temp.charAt(0), '')
  //   console.log(first)
  //   first = first.concat(rest)

  //   updatePrompt(first)
  //   updateAlertShow(true)
  // }

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
              <Flex flex="3 0 220px" mr={1} minWidth="220px">
                <TextField
                  // id="outlined-basic"
                  label="Title"
                  minWidth="180px"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Flex>
              <Flex flex="1 0 220px" minWidth="220px">
                <Autocomplete
                  freeSolo
                  value={genre}
                  onChange={(e, value = '') => {
                    setGenre(value)
                  }}
                  options={genreOptions}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Genre" fullWidth />
                  )}
                />
              </Flex>
            </Flex>
            <Flex>
              <TextField
                id="outlined-multiline-static"
                label="Prompt"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value)
                }}
                multiline
                rows={3}
                fullWidth
              />
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
