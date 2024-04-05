import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root'
import MiniDrawer from './AppFrame'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '@fontsource/spectral'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#387780',
    },
    secondary: {
      main: '#FA8072',
    },
    success: {
      main: '#cad2c5',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#dbd4d3',
    },
  },
  typography: {
    fontFamily: '"Spectral", "Helvetica", "Arial", sans-serif',
  },
})

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <MiniDrawer />
  </ThemeProvider>
)
