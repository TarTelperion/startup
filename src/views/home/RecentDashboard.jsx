import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Typography } from '@mui/material'
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

  const mostRecentArray = findMostRecent(stories).slice(-2)

  const mostRecentText = (mostRecent) => {
    let letters =
      mostRecent?.additions?.[mostRecent.additions.length - 1]?.content?.slice(
        0,
        150
      ) ?? ''
    if (letters !== '') {
      letters += '...'
    } else {
      letters = 'This story was created mere moments ago'
    }
    return letters
  }

  return (
    <Flex flexColumn overflow="hidden">
      <DashHeader title="Recent Activity" />
      <Flex maxHeight={300} overflow={'scroll'} flexColumn>
        {mostRecentArray.map((mostRecent, index) => {
          return (
            <Flex key={index} overflow="hidden" padding={1}>
              <Flex display="flex" flexDirection="row">
                <Flex
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
                </Flex>
                <Flex flexDirection="column">
                  <Flex flexDirection="column" sx={{ mt: 2, ml: 1 }} mb={0}>
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
                    <Flex flexDirection="row" mt={0}>
                      <Typography variant="caption">
                        {`${
                          mostRecent.additions[mostRecent.additions.length - 1]
                            ?.authorName ?? user.name
                        }, ${DateTime.fromISO(mostRecent.updatedAt).toRelative()} `}
                      </Typography>
                    </Flex>
                  </Flex>
                  <Flex ml={2} mt={2} sx={{ paddingRight: 2 }} flexRow>
                    <Typography>{mostRecentText(mostRecent)}</Typography>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default RecentDashboard
