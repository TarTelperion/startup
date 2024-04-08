// External Dependencies
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
} from '@mui/material'
import { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { Typography, Box } from '@mui/material'
// Absolute Dependencies

// Relative Dependencies
import { get } from '../../fetch/get'
import { useUser } from '../../hooks/useUser'
import { Flex, ViewHeader } from '../../layout'
import { useJoinedStories } from '../../hooks/useJoinedStories'

const Home = () => {
  const { user } = useUser()
  const { stories } = useJoinedStories()

  const paperStyles = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    p: 2,
  }

  return (
    <>
      <ViewHeader>
        <Typography variant="h6" component="div">
          User Home
        </Typography>
        <Typography variant="h6" component="div">
          {user?.name}
        </Typography>
      </ViewHeader>
      <Flex flexRow>
        <Flex flexColumn mr={2}>
          <Paper sx={paperStyles} elevation={4}>
            <Flex flexColumn>
              <Box>
                <Typography variant="subtitle2" align="center">
                  Joined Stories
                </Typography>
                <List>
                  {stories.map(({ title, authors, genre, writer }, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <ListItemIcon>
                          <IconButton disabled={writer !== user._id}>
                            <CreateIcon />
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
                            {authors +
                              `${authors > 1 ? ' authors' : ' author'}`}
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Flex>
          </Paper>
        </Flex>
        <Flex flexColumn>
          <Flex flexColumn mb={2}>
            <Paper sx={paperStyles} elevation={4}>
              Paper2
            </Paper>
          </Flex>
          <Flex flexColumn>
            <Paper sx={paperStyles} elevation={4}>
              Paper3
            </Paper>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Home