import { Flex } from '../../layout'
import { DashHeader } from './DashHeader'

const RecentDashboard = ({ user }) => {
  return (
    <Flex flexColumn overflow="hidden">
      <DashHeader title="Recent Activity" />
      <Flex flexColumn overflowY="scroll">
        {null}
      </Flex>
    </Flex>
  )
}

export default RecentDashboard
