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

const Join = () => {
  let stories = [
    {
      title: 'Dawn of Darkness',
      authors: 3,
      genre: 'Fantasy',
    },
    {
      title: 'Dawn of Darkness',
      authors: 3,
      genre: 'Fantasy',
    },
  ]
  return (
    <>
      <Typography>
        <h1 align="center">Join a New Story</h1>
      </Typography>
      <List>
        <ListItem
          secondaryAction={
            <ListItemIcon>
              <IconButton>
                <AddCircleIcon />
              </IconButton>
            </ListItemIcon>
          }
        >
          <ListItemText>Dawn of Darkness</ListItemText>
        </ListItem>
        <ListItem>More stuff</ListItem>
      </List>
    </>
  )
}

export default Join
