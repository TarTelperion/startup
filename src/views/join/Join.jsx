import { useState } from 'react'
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
import { Add } from '@mui/icons-material'
import { Flex, ViewHeader } from '../../layout'

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
      <ViewHeader>{'Join a New Story'}</ViewHeader>
      <List>
        {stories.map(({ title, authors, genre }, index) => (
          <ListItem
            key={index}
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
