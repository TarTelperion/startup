import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Typography } from '@mui/material'
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
      <Flex flexRow>
        <FormatQuoteIcon color="secondary" sx={{ marginLeft: 2, marginY: 2 }} />
        <Typography sx={{ marginX: 1, marginY: 3 }}>
          {mostRecent.additions.length === 0
            ? `${mostRecent.title} was created`
            : mostRecent?.additions[mostRecent.additions.length - 1].content}
        </Typography>
      </Flex>
    </Flex>
  )
}

export default RecentDashboard
