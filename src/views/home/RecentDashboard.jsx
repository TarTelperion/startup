import { Flex } from '../../layout'
import { DashHeader } from './DashHeader'

const RecentDashboard = ({ user }) => {
  return (
    <Flex flexColumn overflow="hidden">
      <DashHeader title="Recent Activity" />
    </Flex>
  )
}

export default RecentDashboard
