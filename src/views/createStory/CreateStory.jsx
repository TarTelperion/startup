import AutoIcon from '@mui/icons-material/AutoFixHigh'
import {
  Autocomplete,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useCreateStory } from '../../hooks/stories/useCreateStory'
import { useStreamPrompt } from '../../hooks/stories/useStreamPrompt'
import { Flex, ViewHeader } from '../../layout'
import { genreOptions } from './genreOptions'

const Create = () => {
  const { create } = useCreateStory()

  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')

  const [bind, start] = useStreamPrompt(setPrompt)

  const isValid = Boolean(prompt && title && genre)

  const handleCreate = () => {
    create({
      title,
      genre,
      prompt,
    })
  }

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
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Autocomplete
              freeSolo
              value={genre}
              onChange={(e, value) => {
                setGenre(value || '')
              }}
              options={genreOptions}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Genre" fullWidth />
              )}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              inputRef={bind.ref}
              label="Prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              multiline
              rows={3}
              fullWidth
              InputProps={{
                endAdornment: !prompt && (
                  <Flex height="100%" px={1}>
                    <Chip
                      icon={<AutoIcon />}
                      label="Generate"
                      color="primary"
                      variant="outlined"
                      onClick={async () => {
                        await start(genre)
                        // const randomPrompt =
                        //   promptOptions[randomInt(0, promptOptions.length - 1)]
                        // setPrompt(randomPrompt)
                      }}
                      sx={{
                        '& > svg': {
                          marginLeft: '8px !important',
                          marginBottom: '1px !important',
                          height: '0.75em',
                          width: '0.75em',
                        },
                      }}
                    />
                  </Flex>
                ),
              }}
            />
          </Stack>
          <Flex flexColumn pt={3}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              disabled={!isValid}
              onClick={handleCreate}
            >
              Create
            </Button>
          </Flex>
        </Paper>
      </Flex>
    </>
  )
}

export default Create
