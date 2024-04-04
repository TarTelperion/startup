import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <div>
          <h1>Hello World</h1>
        </div>
      </ThemeProvider>
    </React.Fragment>

  )
}

export default App