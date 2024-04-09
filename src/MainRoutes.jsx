// External Dependencies
import { Routes, Navigate, Route } from 'react-router-dom'
import { Flex } from './layout'
import Home from './views/home/Home'
import Create from './views/createStory/CreateStory'
import Join from './views/join/Join'
import Write from './views/write/Write'

// Absolute Dependencies

// Relative Dependencies

const MainRoutes = () => {
  return (
    <Flex flexDirection="column" flex="1 1 auto">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/join" element={<Join />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" exact element={<Navigate replace to="/home" />} />
      </Routes>
    </Flex>
  )
}

export default MainRoutes
