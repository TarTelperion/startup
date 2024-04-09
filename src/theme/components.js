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
}
