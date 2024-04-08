// External Dependencies
import { Paper } from '@mui/material'
import { useEffect } from 'react'
import { Typography } from '@mui/material'

// Absolute Dependencies

// Relative Dependencies
import { useUser } from '../../hooks/useUser'
import { Flex, ViewHeader } from '../../layout'

const Home = (props) => {
  const { user } = useUser()
  console.log('user', user)

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
            <Typography variant="h1">Lorem Ipsum</Typography>
            <Typography variant="h2">Lorem Ipsum</Typography>
            <Typography variant="h3">Lorem Ipsum</Typography>
            <Typography variant="h4">Lorem Ipsum</Typography>
            <Typography variant="h5">Lorem Ipsum</Typography>
            <Typography variant="h6">Lorem Ipsum</Typography>
            <Typography variant="subtitle1">Lorem Ipsum</Typography>
            <Typography variant="subtitle2">Lorem Ipsum</Typography>
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
