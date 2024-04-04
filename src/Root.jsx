import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme()

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <h1>Hello, World!</h1>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
