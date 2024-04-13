import { Navigate, Route, Routes } from 'react-router-dom'
import { useGlobalSocketAlerts } from './hooks/useGlobalSocketAlerts'
import Create from './views/createStory/CreateStory'
import Home from './views/home/Home'
import Search from './views/search/Search'
import StoryRoutes from './views/stories/StoryRoutes'
import Write from './views/write/Write'

const MainRoutes = ({ userId }) => {
  useGlobalSocketAlerts(userId)

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/write" element={<Write />} />
      <Route path="/create" element={<Create />} />
      <Route path="/search" element={<Search />} />
      <Route path="/stories/*" element={<StoryRoutes />} />
      <Route path="/" exact element={<Navigate replace to="/home" />} />
      <Route path="*" exact element={<Navigate replace to="/home" />} />
    </Routes>
  )
}

export default MainRoutes
