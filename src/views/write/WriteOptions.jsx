import { SpeedDial, SpeedDialAction, Box } from '@mui/material'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SaveIcon from '@mui/icons-material/Save'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export default function WriteOptions() {
  return (
    <Box sx={{ height: 'auto', transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Story Options"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key={'save'}
          icon={<SaveIcon />}
          tooltipTitle={'Save'}
        />
        <SpeedDialAction
          key={'pass-turn'}
          icon={<ArrowForwardIosIcon />}
          tooltipTitle={'Pass Turn'}
        />
      </SpeedDial>
    </Box>
  )
}
