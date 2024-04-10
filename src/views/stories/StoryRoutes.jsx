import { Navigate, Route, Routes } from 'react-router-dom'
import Write from '../write/Write'
import Join from './Join'
import Joined from './Joined'

const StoryRoutes = () => {
  return (
    <Routes>
      <Route path="find" element={<Join />} />
      <Route path="joined" element={<Joined />} />
      <Route path="write/:storyId" element={<Write />} />
      <Route path="*" exact element={<Navigate replace to="join" />} />
    </Routes>
  )
}

export default StoryRoutes
