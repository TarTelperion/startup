import { ViewHeader } from '../../layout'
import StoryList from './StoryList'

const Joined = () => {
  return (
    <>
      <ViewHeader>{'My Stories'}</ViewHeader>
      <StoryList stories={[]} />
    </>
  )
}

export default Joined
