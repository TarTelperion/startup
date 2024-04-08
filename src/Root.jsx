import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppFrame from './AppFrame'
import { palette, typography, components } from './theme'

import '@fontsource/spectral'

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppFrame />
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
