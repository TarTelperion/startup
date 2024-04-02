import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, NavLink, Routes, Navigate} from 'react-router-dom';
import App from './App.jsx'
import Write from './user/write.jsx'
import User from './user/user.jsx'
import Home from './user/home.jsx'
import Blocked from './global_files/blocked.jsx'
import Login from './global_files/login.jsx'
import Index from './global_files/index.jsx'
import '@fontsource/spectral'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <div className='app'>
            <nav className='navbar'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/user">User</NavLink>
                <NavLink to="/write">Write</NavLink>
                <NavLink to="/login">Log In</NavLink> 
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/user" element={<User />}></Route>
                    <Route path="/write" element={<Write />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
            </main>
        </div>
    </BrowserRouter>
)