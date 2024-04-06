import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppFrame from './AppFrame'
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
    fontFamily: '"Spectral", "serif", "Arial", sans-serif',
  },
})

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppFrame />
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
