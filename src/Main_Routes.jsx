// External Dependencies
import { Routes, Navigate, Route } from 'react-router-dom'
import { Flex } from './layout'
import Home from './views/home/Home'

// Absolute Dependencies

// Relative Dependencies

const MainRoutes = () => {
  return (
    <Flex flexDirection="column" flex="1 1 auto">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/write" element={<p>Write</p>} />
        <Route path="/join" element={<p>Join</p>} />
        <Route path="/create" element={<p>create</p>} />
        <Route path="/login" element={<p>login</p>} />
        <Route path="/" exact element={<Navigate replace to="/home" />} />
      </Routes>
    </Flex>
  )
}

export default MainRoutes
