import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useGlobalStories } from '../../hooks/stories/useGlobalStories'
import { ViewHeader } from '../../layout'

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
