// External Dependencies
import { Paper, Typography } from '@mui/material'
// Absolute Dependencies

// Relative Dependencies
import { useUser } from '../../hooks/useUser'
import { Flex, ViewHeader } from '../../layout'
import JoinedDashboard from './JoinedDashboard'
import OwnedDashboard from './OwnedDashboard'
import RecentDashboard from './RecentDashboard'

const Home = () => {
  const { user } = useUser()

  const paperStyles = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflow: 'hidden',
  }

  return (
    <Flex flexColumn pb={3}>
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
            <JoinedDashboard user={user} />
          </Paper>
        </Flex>
        <Flex flexColumn>
          <Flex flexColumn mb={2}>
            <Paper sx={paperStyles} elevation={4}>
              <OwnedDashboard user={user} />
            </Paper>
          </Flex>
          <Flex flexColumn>
            <Paper sx={paperStyles} elevation={4}>
              <RecentDashboard user={user} />
            </Paper>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
