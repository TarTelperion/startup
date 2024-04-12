import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Box, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { useMyStories } from '../../hooks/stories/useMyStories'
import { Flex } from '../../layout'
import { DashHeader } from './DashHeader'

const RecentDashboard = ({ user }) => {
  const { stories } = useMyStories(user._id)

  const findMostRecent = () => {
    let temp = stories[0]
    for (let i = 0; i < stories.length; i++) {
      if (stories[i].updatedAt > temp.updatedAt) {
        temp = stories[i]
      }
    }
    return temp
  }

  const mostRecent = findMostRecent()

  return (
    <Flex flexColumn overflow="hidden">
      <DashHeader title="Recent Activity" />
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
          />
        </Box>
        {mostRecent && (
          <Typography ml={2} mt={2} sx={{ textOverflow: 'ellipsis' }}>
            {mostRecent?.additions?.length === 0
              ? `${mostRecent.title} was created`
              : mostRecent?.additions[mostRecent.additions.length - 1]?.content}
          </Typography>
        )}
      </Box>
      {mostRecent && (
        <Box display="flex" flexDirection="row" ml={2} mt={2}>
          <Typography>
            {`--Written ${DateTime.fromISO(mostRecent.updatedAt).toRelative()} by ${mostRecent.additions[mostRecent.additions.length - 1]?.authorName}`}
          </Typography>
        </Box>
      )}
    </Flex>
  )
}

export default RecentDashboard
