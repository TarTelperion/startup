import { Paper, Slide } from '@mui/material'

const EdgyPaper = ({
  children,
  open = true,
  transition = false,
  elevation = 20,
}) => {
  if (transition) {
    return (
      <Slide
        direction="up"
        in={open}
        sx={{ bottom: '-50px' }}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={elevation}>{children}</Paper>
      </Slide>
    )
  }
  return (
    <Paper sx={{ bottom: '-50px' }} elevation={elevation}>
      {children}
    </Paper>
  )
}

export default EdgyPaper
