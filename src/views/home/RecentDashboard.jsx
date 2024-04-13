import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Box, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router-dom'
import { useMyStories } from '../../hooks/stories/useMyStories'
import { Flex } from '../../layout'
import { DashHeader } from './DashHeader'

const RecentDashboard = ({ user }) => {
  const { stories } = useMyStories(user._id)
  const navigate = useNavigate()

  const findMostRecent = (array) => {
    function sortArray(a, b) {
      const moveValue = a.updatedAt > b.updatedAt
      return moveValue ? 1 : -1
    }
    return array.sort((a, b) => sortArray(a, b))
  }

  const mostRecentArray = stories.slice(-2)

  const mostRecentText = (mostRecent) => {
    let letters =
      mostRecent?.additions?.[mostRecent.additions.length - 1]?.content?.slice(
        0,
        150
      ) ?? ''
    letters += '...'
    return letters
  }

  return (
    <Flex flexColumn overflow="hidden">
      <DashHeader title="Recent Activity" />
      <Box maxHeight={300} overflow={'scroll'}>
        {mostRecentArray.map((mostRecent, index) => {
          return (
            <Box key={index}>
              <Box display="flex" flexDirection="row">
                <Box
                  bgcolor="secondary.main"
                  borderRadius={2}
                  sx={{
                    display: 'flex',
                    padding: 1,
                    alignSelf: 'flex-start',
                    ml: 2,
                    mt: 2,
                  }}
                >
                  <FormatQuoteIcon
                    sx={{
                      fill: 'white',
                    }}
                    fontSize="large"
                  />
                </Box>
                <Box flexDirection="column">
                  <Box flexDirection="column" sx={{ mt: 2, ml: 1 }} mb={0}>
                    <Typography
                      variant="body"
                      sx={{
                        fontWeight: 'bold',
                        '&:hover': { cursor: 'pointer' },
                      }}
                      onClick={() =>
                        navigate(`/stories/write/${mostRecent._id}`)
                      }
                    >
                      {mostRecent.title}
                    </Typography>
                    <Box flexDirection="row" mt={0}>
                      <Typography variant="caption">
                        {`${
                          mostRecent.additions[mostRecent.additions.length - 1]
                            ?.authorName
                        }, ${DateTime.fromISO(mostRecent.updatedAt).toRelative()} `}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    ml={2}
                    mt={2}
                    sx={{ maxWidth: 'calc(100% - 32px)' }}
                  >
                    <Typography>{mostRecentText(mostRecent)}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Flex>
  )
}

export default RecentDashboard
