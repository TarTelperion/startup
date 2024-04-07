// External Dependencies
import { Flex } from '../../layout'
import { Paper } from '@mui/material'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
// Absolute Dependencies

// Relative Dependencies

const Home = (props) => {
  let user = undefined

  const get_user = async () => {
    const unprocessed_response = fetch('http://localhost:3000/api/auth')
    const json_user = await unprocessed_response.json
    return json_user
  }

  useEffect(() => {
    user = get_user()
  }, [])

  const paperStyles = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    p: 2,
  }

  return (
    <>
      <Typography>
        <h1 align="center">Eventually you'll see your username here</h1>
      </Typography>
      <Flex flexRow>
        <Flex flexColumn mr={2}>
          <Paper sx={paperStyles} elevation={4}>
            Paper 1
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
