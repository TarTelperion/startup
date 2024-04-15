import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { useGlobalStories } from '../../hooks/stories/useGlobalStories'
import { useUser } from '../../hooks/useUser'
import { Flex } from '../../layout'
import StoryList from '../stories/StoryList'

const Search = () => {
  const { user } = useUser()
  const { stories } = useGlobalStories(user._id)

  const [search, setSearch] = useState('')

  const handleInputChange = (e) => {
    setSearch(e.target.value)
  }

  const searchResults = useMemo(() => {
    return stories.filter((story) => {
      const searchTerms = search.toLowerCase().split(' ')
      return searchTerms.every((term) => {
        return (
          story.title.toLowerCase().includes(term) ||
          story.genre.toLowerCase().includes(term)
        )
      })
    })
  }, [stories, search])

  return (
    <Flex flexColumn pt={2}>
      <Flex mb={2}>
        <TextField
          value={search}
          onChange={handleInputChange}
          label="Search All Stories"
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: search ? (
              <IconButton onClick={() => setSearch('')}>
                <CloseIcon />
              </IconButton>
            ) : (
              <SearchIcon sx={{ mr: 1 }} />
            ),
          }}
        />
      </Flex>
      <StoryList stories={searchResults} user={user} />
    </Flex>
  )
}

export default Search
