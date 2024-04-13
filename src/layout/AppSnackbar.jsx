import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  MaterialDesignContent,
  SnackbarProvider,
  closeSnackbar,
} from 'notistack'

import CloseIcon from '@mui/icons-material/Close'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 700,
    '&.notistack-MuiContent-success': {
      backgroundColor: theme.palette.success.main,
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: theme.palette.error.main,
    },
    '& .MuiSnackbarContent-info': {
      backgroundColor: theme.palette.info.main,
    },
  })
)

const AppSnackbar = () => {
  return (
    <SnackbarProvider
      action={(snackbarId) => (
        <IconButton onClick={() => closeSnackbar(snackbarId)} color="inherit">
          <CloseIcon color="inherit" />
        </IconButton>
      )}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    />
  )
}

export default AppSnackbar
