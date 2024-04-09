import '@fontsource/spectral'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppFrame from './AppFrame'
import { components, palette, typography } from './theme'

const theme = createTheme({
  palette,
  typography,
  components,
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
