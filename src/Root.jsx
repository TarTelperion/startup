import '@fontsource/spectral'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppFrame from './AppFrame'
import SocketProvider from './socket/SocketProvider'
import { components, palette, typography } from './theme'

const theme = createTheme({
  palette,
  typography,
  components,
})

console.log('theme', theme)

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SocketProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppFrame />
          </ThemeProvider>
        </SocketProvider>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
