import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Box, Typography } from '@mui/material'
import { useJoinedStories } from '../../hooks/stories/useJoinedStories'
import { Flex } from '../../layout'
import { DashHeader } from './DashHeader'

const RecentDashboard = ({ user }) => {
  const { stories } = useJoinedStories(user._id)
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
      <Flex marginY={2} flexRow>
        <Box
          sx={{
            marginLeft: 2,
            borderRadius: 2,
            width: 0.1,
            height: 0.07,
            bgcolor: 'secondary.main',
          }}
          component="div"
        >
          <FormatQuoteIcon sx={{ color: 'white' }} />
        </Box>
        {mostRecent && (
          <Typography sx={{ marginX: 1 }}>
            {mostRecent?.additions?.length === 0
              ? `${mostRecent.title} was created`
              : mostRecent?.additions[mostRecent.additions.length - 1]?.content}
          </Typography>
        )}
      </Flex>
    </Flex>
  )
}

export default RecentDashboard
