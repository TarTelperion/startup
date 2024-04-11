// External Dependencies
import { Navigate, Route, Routes } from 'react-router-dom'
import Create from './views/createStory/CreateStory'
import Home from './views/home/Home'
import StoryRoutes from './views/stories/StoryRoutes'
import Write from './views/write/Write'

// Absolute Dependencies

// Relative Dependencies

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/write" element={<Write />} />
      <Route path="/create" element={<Create />} />
      <Route path="/stories/*" element={<StoryRoutes />} />
      <Route path="/" exact element={<Navigate replace to="/home" />} />
    </Routes>
  )
}

export default MainRoutes
