import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SaveIcon from '@mui/icons-material/Save'
import { Box, SpeedDial, SpeedDialAction } from '@mui/material'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'

const WriteOptions = ({ onClickSave, onClickSkip }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 1,
        right: '24px',
        transform: 'translateZ(0px)',
        zIndex: 1500,
        height: 'min-content',
      }}
      flexGrow={0}
    >
      <SpeedDial
        ariaLabel="Write Options"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key={'save'}
          icon={<SaveIcon />}
          tooltipTitle={'Save'}
          onClick={onClickSave}
        />
        <SpeedDialAction
          key={'pass-turn'}
          icon={<ArrowForwardIosIcon />}
          tooltipTitle={'Pass Turn'}
          onClick={onClickSkip}
        />
      </SpeedDial>
    </Box>
  )
}

export default WriteOptions
