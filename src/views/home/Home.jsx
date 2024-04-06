// External Dependencies
import { Flex } from '../../layout'
import { Paper } from '@mui/material'
import { useEffect } from 'react'
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

  return (
    <Flex flexRow>
      <Flex flexColumn>
        <Paper>Paper 1</Paper>
      </Flex>
      <Flex flexColumn>
        <Flex>
          <Paper>Paper2</Paper>
        </Flex>
        <Flex>
          <Paper>Paper3</Paper>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
