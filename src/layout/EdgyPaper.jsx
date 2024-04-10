import { Paper, Slide } from '@mui/material'
import { useEffect } from 'react'

const EdgyPaper = ({
  children,
  open = true,
  transition = false,
  elevation = 24,
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

  sx.display = 'flex'
  sx.flexDirection = 'column'
  sx.flex = '1 1 auto'
  sx.height = '100%'
  sx.width = '100%'
  // NOT NECESSARY, OVERLY COMPLICATED:
  // sx.height = '100vh'
  // sx.paddingBottom = '50vh'
  // sx.marginBottom = '-50vh'
  sx.overflow = 'hidden'
  sx.borderBottomLeftRadius = '0px !important'
  sx.borderBottomRightRadius = '0px !important'

  if (transition) {
    sx.borderRadius = '10px'
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
