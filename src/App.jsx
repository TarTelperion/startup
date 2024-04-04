import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root'
import MiniDrawer from './AppFrame'
import '@fontsource/spectral'
import './styles.css'

createRoot(document.getElementById('root')).render(<MiniDrawer />)
