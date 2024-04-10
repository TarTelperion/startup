import { alpha } from '@mui/material/styles'

export const components = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        fontWeight: 700,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        fontWeight: 700,
        ...(ownerState.variant === 'contained' &&
          ownerState.color === 'secondary' && {
            color: '#fff',
          }),
      }),
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.dark,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.primary.main, 0.8),
          color: theme.palette.primary.contrastText,
          '& svg': {
            color: theme.palette.primary.contrastText,
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: () => ({
        fontWeight: 700,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.dark,
      }),
    },
  },
}
