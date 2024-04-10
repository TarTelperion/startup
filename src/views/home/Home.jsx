// External Dependencies
import CreateIcon from '@mui/icons-material/Create'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
// Absolute Dependencies

// Relative Dependencies
import { useGlobalStories } from '../../hooks/stories/useGlobalStories'
import { useJoinedStories } from '../../hooks/stories/useJoinedStories'
import { useUser } from '../../hooks/useUser'
import { Flex, ViewHeader } from '../../layout'

const Home = () => {
  const { user } = useUser()
  const { stories: joinedStories } = useJoinedStories(user._id)
  const { stories: globalStories } = useGlobalStories(user._id)

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
                  {joinedStories.map(
                    ({ title, authors, genre, writer }, index) => (
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
                    )
                  )}
                </List>
              </Box>
            </Flex>
          </Paper>
        </Flex>
        <Flex flexColumn>
          <Flex flexColumn mb={2}>
            <Paper sx={paperStyles} elevation={4}>
              <Typography variant="subtitle2" align="center">
                Owned Stories
              </Typography>
              <List>
                {globalStories.map(
                  ({ title, owner, authors, genre }, index) => {
                    if (owner == user._id) {
                      return (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <ListItemIcon>
                              <IconButton>
                                <DeleteForeverIcon />
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
                          />
                        </ListItem>
                      )
                    }
                  }
                )}
              </List>
            </Paper>
          </Flex>
          <Flex flexColumn>
            <Paper sx={paperStyles} elevation={4}>
              <Typography variant="subtitle2" align="center">
                Most Recent
              </Typography>
              {/* <Typography>
                {stories &&
                stories.length > 0 &&
                stories[stories.length - 1].content ? (
                  `"${stories[stories.length - 1].content}"--${stories[stories.length - 1].mostrecent ?? 'unknown'}`
                ) : (
                  <></>
                )}
              </Typography> */}
            </Paper>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Home
