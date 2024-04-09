import { Paper, Slide } from '@mui/material'
import { useEffect } from 'react'

const EdgyPaper = ({
  children,
  open = true,
  transition = false,
  elevation = 20,
  sx,
}) => {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden'

    return () => {
      // Re-enable scrolling on unmount
      document.body.style.overflow = 'auto'
    }
  }, [])
  sx.bottom = 0
  sx.paddingBottom = '50px'
  sx.marginBottom = '-50px'
  if (transition) {
    return (
      <Slide direction="up" in={open} sx={sx} mountOnEnter unmountOnExit>
        <Paper elevation={elevation}>{children}</Paper>
      </Slide>
    )
  }
  return (
    <Paper elevation={elevation} sx={sx}>
      {children}
    </Paper>
  )
}

export default EdgyPaper
