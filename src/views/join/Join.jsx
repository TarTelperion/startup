import {
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import { useState } from 'react'
import { Flex } from '../../layout'
import { Add } from '@mui/icons-material'

const Join = () => {
  let stories = [
    {
      title: 'Dawn of Darkness',
      authors: 1,
      genre: 'Fantasy',
    },
    {
      title: 'When it Changed',
      authors: 17,
      genre: 'Fantasy',
    },
    {
      title: 'Roochie bums',
      authors: 50000,
      genre: 'Fantasy',
    },
  ]

  return (
    <>
      <Typography>
        <h1 align="center">Join a New Story</h1>
      </Typography>
      <List>
        {stories.map(({ title, authors, genre }) => (
          <ListItem
            secondaryAction={
              <ListItemIcon>
                <IconButton>
                  <AddCircleIcon />
                </IconButton>
              </ListItemIcon>
            }
          >
            <ListItemText
              primary={title}
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                  >
                    {`${genre}--`}
                  </Typography>
                  {authors + `${authors > 1 ? ' authors' : ' author'}`}
                </>
              }
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Join
