import { useState } from 'react'
import { useGlobalStories } from '../../hooks/useGlobalStories'
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
  const { globalStories } = useGlobalStories()

  return (
    <>
      <ViewHeader>{'Join a New Story'}</ViewHeader>
      <List>
        {globalStories.map(({ title, authors, genre }, index) => (
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
