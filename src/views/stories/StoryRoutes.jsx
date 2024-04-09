import { Navigate, Route, Routes } from 'react-router-dom'
import Join from './Join'
import Joined from './Joined'

const StoryRoutes = () => {
  return (
    <Routes>
      <Route path="join" element={<Join />} />
      <Route path="joined" element={<Joined />} />
      <Route path="*" exact element={<Navigate replace to="join" />} />
    </Routes>
  )
}

export default StoryRoutes
