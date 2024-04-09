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
  sx.height = '100vh'
  sx.width = '100%'
  sx.paddingBottom = '50vh'
  sx.marginBottom = '-50vh'
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
