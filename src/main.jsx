import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, NavLink, Routes, Navigate, useLocation, Link} from 'react-router-dom';
import App from './App.jsx'
import Write from './user/write.jsx'
import User from './user/user.jsx'
import Home from './user/home.jsx'
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LoginIcon from '@mui/icons-material/Login';
import Blocked from './global_files/blocked.jsx'
import Login from './global_files/login.jsx'
import Index from './global_files/index.jsx'
import '@fontsource/spectral/300.css';
import './styles.css'

function Nav_bar() {
    return (
        <BottomNavigation 
        value={useLocation().pathname}>
            <BottomNavigationAction 
            component={Link}
            to="/"
            label="Home"
            value="home"
            icon={<CottageIcon />}
            />
            <BottomNavigationAction 
            component={Link}
            to="/user"
            label="User"
            value="user"
            icon={<AccountCircleIcon />}
            />
            <BottomNavigationAction 
            component={Link}
            to="/write"
            label="Write"
            value="write"
            icon={<HistoryEduIcon />}
            />
            <BottomNavigationAction 
            component={Link}
            to="/login"
            label="Log In"
            value="login"
            icon={<LoginIcon />}
            />
        </BottomNavigation>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <div className='app'>
            <main>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/user" element={<User />}></Route>
                    <Route path="/write" element={<Write />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
                <Nav_bar />
            </main>
        </div>
    </BrowserRouter>
)